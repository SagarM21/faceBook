import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Profile from "./pages/profile";
import Reset from "./pages/reset";
import CreatePostPopup from "./components/createPostPopup";
import { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { postReducer } from "./functions/reducers";
import LoggedInRoute from "../src/routes/LoggedInRoute";
import NotLoggedInRoute from "../src/routes/NotLoggedInRoute";
import { useSelector } from "react-redux";
import Home from "./pages/home";
import Activate from "./pages/home/activate";
import Friends from "./pages/friends";

const App = () => {
	const [createPostVisible, setCreatePostVisible] = useState(false);
	const { user, darkTheme } = useSelector((state) => ({ ...state }));
	const [{ loading, error, posts }, dispatch] = useReducer(postReducer, {
		loading: false,
		posts: [],
		error: "",
	});
	useEffect(() => {
		getAllPosts();
	}, []);
	const getAllPosts = async () => {
		try {
			dispatch({
				type: "POSTS_REQUEST",
			});
			const { data } = await axios.get(
				`${process.env.REACT_APP_BACKEND_URL}/getAllPosts`,
				{
					headers: {
						Authorization: `Bearer ${user.token}`,
					},
				}
			);
			dispatch({
				type: "POSTS_SUCCESS",
				payload: data,
			});
		} catch (error) {
			dispatch({
				type: "POSTS_ERROR",
				payload: error.response.data.message,
			});
		}
	};
	return (
		<div className={darkTheme ? "dark" : ""}>
			{createPostVisible && (
				<CreatePostPopup
					user={user}
					setCreatePostVisible={setCreatePostVisible}
					posts={posts}
					dispatch={dispatch}
				/>
			)}
			<Routes>
				<Route element={<LoggedInRoute />}>
					<Route
						path='/profile'
						element={
							<Profile
								setCreatePostVisible={setCreatePostVisible}
								getAllPosts={getAllPosts}
							/>
						}
						exact
					/>
					<Route
						path='/profile/:username'
						element={
							<Profile
								setCreatePostVisible={setCreatePostVisible}
								getAllPosts={getAllPosts}
							/>
						}
						exact
					/>
					<Route
						path='/friends'
						element={
							<Friends
								setCreatePostVisible={setCreatePostVisible}
								getAllPosts={getAllPosts}
							/>
						}
						exact
					/>
					<Route
						path='/friends/:type'
						element={
							<Friends
								setCreatePostVisible={setCreatePostVisible}
								getAllPosts={getAllPosts}
							/>
						}
						exact
					/>
					<Route
						path='/'
						element={
							<Home
								setCreatePostVisible={setCreatePostVisible}
								posts={posts}
								loading={loading}
								getAllPosts={getAllPosts}
							/>
						}
						exact
					/>
					<Route path='/activate/:token' element={<Activate />} exact />
				</Route>
				<Route element={<NotLoggedInRoute />}>
					<Route path='/login' element={<Login />} exact />
				</Route>
				<Route path='/reset' element={<Reset />} />
			</Routes>
		</div>
	);
};

export default App;
