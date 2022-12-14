const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const oauth_link = "https://developers.google.com/oauthplayerground/";

const { EMAIL, FACEBOOK_ID, FACEBOOK_REFRESH, FACEBOOK_SECRET } = process.env;

const auth = new OAuth2(
	FACEBOOK_ID,
	FACEBOOK_SECRET,
	FACEBOOK_REFRESH,
	oauth_link
);

exports.sendVerificationEmail = (email, name, url) => {
	auth.setCredentials({
		refresh_token: FACEBOOK_REFRESH,
	});
	const accessToken = auth.getAccessToken();
	const stmp = nodemailer.createTransport({
		service: "gmail",
		auth: {
			type: "OAuth2",
			user: EMAIL,
			clientId: FACEBOOK_ID,
			clientSecret: FACEBOOK_SECRET,
			refreshToken: FACEBOOK_REFRESH,
			accessToken,
		},
	});
	const mailOptions = {
		from: EMAIL,
		to: email,
		subject: "Facebook email verification",
		html: `<div style="max-width:700px;margin-bottom:1rem;display:flex;align-items:center;gap:10px;font-family:Roboto;font-weight:600;color:#3b5998;"><img src="https://res.cloudinary.com/dmhcnhtng/image/upload/v1645134414/logo_cs1si5.png" alt="" style="width:30px"/><span>Action require: Activate your facebook account</span></div><div style="padding:1rem 0;border-top:1px solid #e5e5e5;border-bottom:1px solid #e5e5e5;color:#141823;font-size:17px;font-family:Roboto;"><span>Hello ${name}</span><div style="padding:20px 0"><span style="padding:1.5rem 0">You recently created an account on Facebook, To complete your
        registration, please confirm your account.</span
    ></div><a href=${url} style="width:200px;padding:10px 15px;background:#4c649b;color:#fff;text-decoration:none;font-weight:600;">Confirm your account</a
><br/><div style="padding-top:20px"><span style="margin:1.5rem 0;color:#898f9c">Facebook allows you to stay in touch with all your friends, once
        registered on facebook, you can share photos, organize events and much
        more.</span
    ></div></div>`,
	};
	stmp.sendMail(mailOptions, (err, res) => {
		if (err) return err;
		return res;
	});
};

exports.sendResetCodeEmail = (email, name, code) => {
	auth.setCredentials({
		refresh_token: FACEBOOK_REFRESH,
	});
	const accessToken = auth.getAccessToken();
	const stmp = nodemailer.createTransport({
		service: "gmail",
		auth: {
			type: "OAuth2",
			user: EMAIL,
			clientId: FACEBOOK_ID,
			clientSecret: FACEBOOK_SECRET,
			refreshToken: FACEBOOK_REFRESH,
			accessToken,
		},
	});
	const mailOptions = {
		from: EMAIL,
		to: email,
		subject: "Reset facebook password",
		html: `<div style="max-width:700px;margin-bottom:1rem;display:flex;align-items:center;gap:10px;font-family:Roboto;font-weight:600;color:#3b5998;"><img src="https://res.cloudinary.com/dmhcnhtng/image/upload/v1645134414/logo_cs1si5.png" alt="" style="width:30px"/><span>Action require: Reset your facebook account password</span></div><div style="padding:1rem 0;border-top:1px solid #e5e5e5;border-bottom:1px solid #e5e5e5;color:#141823;font-size:17px;font-family:Roboto;"><span>Hello ${name}</span><div style="padding:20px 0"><span style="padding:1.5rem 0">Your code to reset the password is: </span
    ></div><a style="width:200px;padding:10px 15px;background:#4c649b;color:#fff;text-decoration:none;font-weight:600;">${code}</a
><br/><div style="padding-top:20px"><span style="margin:1.5rem 0;color:#898f9c">Facebook allows you to stay in touch with all your friends, once
        registered on facebook, you can share photos, organize events and much
        more.</span
    ></div></div>`,
	};
	stmp.sendMail(mailOptions, (err, res) => {
		if (err) return err;
		return res;
	});
};
