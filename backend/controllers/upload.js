exports.uploadImages = async (req, res) => {
	try {
		return res.json("image uploaded");
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};
