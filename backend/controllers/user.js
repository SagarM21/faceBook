const {
	validateEmail,
	validateLength,
	validateUsername,
} = require("../helpers/validation");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { generateToken } = require("../helpers/tokens");
exports.register = async (req, res) => {
	try {
		const {
			first_name,
			last_name,
			email,
			password,
			username,
			bYear,
			bMonth,
			bDay,
			gender,
		} = req.body;

		if (!validateEmail(email)) {
			return res.status(400).json({
				message: "Invalid e-mail address",
			});
		}

		const check = await User.findOne({ email });
		if (check) {
			return res.status(400).json({
				message:
					"This email address already exists, try with a different email address",
			});
		}

		if (!validateLength(first_name, 3, 30)) {
			return res.status(400).json({
				message: "First name must be between 3 and 30 characters.",
			});
		}

		if (!validateLength(last_name, 3, 30)) {
			return res.status(400).json({
				message: "Last name must be between 3 and 30 characters.",
			});
		}

		if (!validateLength(password, 6, 30)) {
			return res.status(400).json({
				message: "Password must be at least 6 characters.",
			});
		}
		const cryptedPassword = await bcrypt.hash(password, 12);
		let tempUsername = first_name + last_name;
		let newUsername = await validateUsername(tempUsername);

		const user = await new User({
			first_name,
			last_name,
			email,
			password,
			username: newUsername,
			bYear,
			bMonth,
			bDay,
			gender,
		}).save();
		const emailVerificationToken = generateToken(
			{ id: user._id.toString() },
			"30m"
		);
		res.json(user);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
