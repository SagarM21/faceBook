import Cookies from "js-cookie";

export const themeReducer = (
	state = Cookies.get("darkTheme")
		? JSON.parse(Cookies.get("darkTheme"))
		: false,
	action
) => {
	switch (action.type) {
		case "DARK":
			return true;
		case "LIGHT":
			return false;

		default:
			return state;
	}
};
