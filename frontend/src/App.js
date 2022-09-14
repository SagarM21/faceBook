import axios from "axios";
import { useEffect, useReducer, useState } from "react";
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

function reducer(state, action) {
	switch (action.type) {
		case "POSTS_REQUEST":
			return { ...state, loading: true, error: "" };

		case "POSTS_SUCCESS":
			return { ...state, loading: false, posts: action.payload, error: "" };

		case "POSTS_ERROR":
			return { ...state, loading: false, error: action.payload };

		default:
			return state;
	}
}

const App = () => {
	const [createPostVisible, setCreatePostVisible] = useState(false);
	const { user } = useSelector((state) => ({ ...state }));
	const [{ loading, error, posts }, dispatch] = useReducer(reducer, {
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
	console.log(posts);
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
						element={
							<Home setCreatePostVisible={setCreatePostVisible} posts={posts} />
						}
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
