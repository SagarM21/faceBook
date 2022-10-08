const mongoose = require("mongoose");
const React = require("../models/React");

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
		const reacts = await React.find({ postRef: req.params.id });

		// TWO METHODS OF FINDING THE REACT, check1 and check
		// const check1 = reacts.find(
		// 	(x) => x.reactBy.toString() === req.user.id
		// )?.react;
		// console.log(check1);
		const check = await React.findOne({
			postRef: req.params.id,
			reactBy: req.user.id,
		});
		// console.log(check);
		// console.log(reacts);
		res.json({
			reacts,
			check: check?.react,
		});
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};
