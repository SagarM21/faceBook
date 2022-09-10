const Post = require("../models/Post");

exports.createPost = async (req, res) => {
	try {
		const post = await new Post(req.body).save();
		return res.json(post);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
