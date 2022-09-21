const express = require("express");
const {
	register,
	activateAccount,
	login,
	sendVerification,
	findUser,
	sendResetPasswordCode,
	validateResetCode,
	changePassword,
	getProfile,
} = require("../controllers/user");
const { authUser } = require("../middlewares/auth");
const router = express.Router();

router.post("/register", register);
router.post("/activate", authUser, activateAccount);
router.post("/login", login);
router.post("/findUser", findUser);
router.post("/sendVerification", authUser, sendVerification);
router.post("/sendResetPasswordCode", sendResetPasswordCode);
router.post("/validateResetCode", validateResetCode);
router.post("/changePassword", changePassword);
router.get("/getProfile/:username", authUser, getProfile);

module.exports = router;
