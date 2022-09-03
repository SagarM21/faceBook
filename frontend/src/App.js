import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Profile from "./pages/profile";
import LoggedInRoute from "./routes/LoggedInRoute";
import NotLoggedInRoute from "./routes/NotLoggedInRoute";

const App = () => {
	return (
		<Routes>
			<Route element={<LoggedInRoute />}>
				<Route path='/' element={<Home />} exact />
				<Route path='/profile' element={<Profile />} exact />
			</Route>
			<Route element={<NotLoggedInRoute />}>
				<Route path='/login' element={<Login />} exact />
			</Route>
		</Routes>
	);
};

export default App;
