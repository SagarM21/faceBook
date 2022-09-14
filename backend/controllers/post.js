const Post = require("../models/Post");

exports.createPost = async (req, res) => {
	try {
		const post = await new Post(req.body).save();
		return res.json(post);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

exports.getAllPosts = async (req, res) => {
	try {
		//  finding and sorting posts desc
		const posts = await Post.find()
			.populate("user", "first_name last_name picture username gender")
			.sort({ createdAt: -1 }); 
		res.json(posts);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
