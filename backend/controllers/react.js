const mongoose = require("mongoose");
const React = require("../models/React");
const User = require("../models/User");

exports.reactPost = async (req, res) => {
	try {
		const { postId, react } = req.body;
		const check = await React.findOne({
			postRef: postId,
			reactBy: mongoose.Types.ObjectId(req.user.id),
		});

		if (check == null) {
			const newReact = new React({
				react: react,
				postRef: postId,
				reactBy: req.user.id,
			});
			await newReact.save();
		} else {
			// checking the react which is saved in db is different from the react which are we getting from frontend, the req.body one
			if (check.react == react) {
				await React.findByIdAndRemove(check._id);
			} else {
				// if not then user is trying to update his reaction
				await React.findByIdAndUpdate(check._id, { react: react });
			}
		}
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

exports.getReacts = async (req, res) => {
	try {
		const reactsArray = await React.find({ postRef: req.params.id });

		// TWO METHODS OF FINDING THE REACT, check1 and check
		// const check1 = reacts.find(
		// 	(x) => x.reactBy.toString() === req.user.id
		// )?.react;
		// console.log(check1);

		// Making the grp of same kind of reacts like:
		// {
		// sad: [{}, {}]
		//}
		const newReacts = reactsArray.reduce((group, react) => {
			let key = react["react"];
			group[key] = group[key] || [];
			group[key].push(react);
			return group;
		}, {});

		const reacts = [
			{
				react: "like",
				count: newReacts.like ? newReacts.like.length : 0,
			},
			{
				react: "haha",
				count: newReacts.haha ? newReacts.haha.length : 0,
			},
			{
				react: "wow",
				count: newReacts.wow ? newReacts.wow.length : 0,
			},
			{
				react: "sad",
				count: newReacts.sad ? newReacts.sad.length : 0,
			},
			{
				react: "angry",
				count: newReacts.angry ? newReacts.angry.length : 0,
			},
			{
				react: "love",
				count: newReacts.love ? newReacts.love.length : 0,
			},
		];

		const check = await React.findOne({
			postRef: req.params.id,
			reactBy: req.user.id,
		});
		const user = await User.findById(req.user.id);
		const checkSaved = user?.savedPosts.find(
			(x) => x.post.toString() === req.params.id
		);
		// console.log(check);
		// console.log(reacts);
		res.json({
			reacts,
			check: check?.react,
			total: reactsArray.length,
			checkSaved: checkSaved ? true : false,
		});
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};
