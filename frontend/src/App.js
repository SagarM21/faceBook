import { useState } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import CreatePostPopup from "./components/createPostPopup";
import Home from "./pages/home";
import Activate from "./pages/home/activate";
import Login from "./pages/login";
import Profile from "./pages/profile";
import Reset from "./pages/reset";
import LoggedInRoute from "./routes/LoggedInRoute";
import NotLoggedInRoute from "./routes/NotLoggedInRoute";

const App = () => {
	const [createPostVisible, setCreatePostVisible] = useState(false);
	const { user } = useSelector((state) => ({ ...state }));
	return (
		<div>
			{createPostVisible && (
				<CreatePostPopup
					user={user}
					setCreatePostVisible={setCreatePostVisible}
				/>
			)}
			<Routes>
				<Route element={<LoggedInRoute />}>
					<Route
						path='/'
						element={<Home setCreatePostVisible={setCreatePostVisible} />}
						exact
					/>
					<Route path='/activate/:token' element={<Activate />} exact />
					<Route path='/profile' element={<Profile />} exact />
				</Route>
				<Route element={<NotLoggedInRoute />}>
					<Route path='/login' element={<Login />} exact />
				</Route>
				<Route element={<Reset />} path='/reset' />
			</Routes>
		</div>
	);
};

export default App;
