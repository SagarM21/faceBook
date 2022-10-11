const Post = require("../models/Post");
const User = require("../models/User");

exports.createPost = async (req, res) => {
	try {
		const post = await new Post(req.body).save();
		// populating so that as soon as the user posts, it will refresh on the spot
		await post.populate("user", "first_name last_name picture username cover");
		return res.json(post);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

exports.getAllPosts = async (req, res) => {
	try {
		//  finding and sorting posts desc
		// const posts = await Post.find()
		// 	.populate("user", "first_name last_name picture username gender")
		// 	.sort({ createdAt: -1 });
		// res.json(posts);

		const followingTemp = await User.findById(req.user.id).select("following");
		const following = followingTemp.following;
		const promises = following.map((user) => {
			return Post.find({ user: user })
				.populate("user", "first_name last_picture picture username cover")
				.populate(
					"comments.commentBy",
					"first_name last_picture picture username"
				)
				.sort({ createdAt: -1 })
				.limit(10);
		});
		const followingPosts = (await Promise.all(promises)).flat();
		const userPosts = await Post.find({ user: req.user.id })
			.populate("user", "first_name last_picture picture username cover")
			.populate(
				"comments.commentBy",
				"first_name last_picture picture username"
			)
			.sort({ createdAt: -1 })
			.limit(10);
		followingPosts.push(...[...userPosts]);
		followingPosts.sort((a, b) => {
			return b.createdAt - a.createdAt;
		});
		res.json(followingPosts);
		// console.log(followingPosts);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

exports.comment = async (req, res) => {
	try {
		const { comment, image, postId } = req.body;
		let newComment = await Post.findByIdAndUpdate(
			postId,
			{
				$push: {
					comments: {
						comment: comment,
						image: image,
						commentBy: req.user.id,
						commentAt: new Date(),
					},
				},
			},
			{
				new: true,
			}
		).populate("comments.commentBy", "picture first_name last_name username");
		res.json(newComment.comments);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

exports.savePost = async (req, res) => {
	try {
		const postId = req.params.id;
		const user = await User.findById(req.user.id);
		const check = user?.savedPosts.find(
			(post) => post.post.toString() == postId
		);
		if (check) {
			await User.findByIdAndUpdate(req.user.id, {
				$pull: {
					savedPosts: {
						_id: check._id,
					},
				},
			});
		} else {
			await User.findByIdAndUpdate(req.user.id, {
				$push: {
					savedPosts: {
						post: postId,
						savedAt: new Date(),
					},
				},
			});
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

exports.deletePost = async (req, res) => {
	try {
		await Post.findByIdAndRemove(req.params.id);
		res.json({ status: "ok" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
