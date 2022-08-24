import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Profile from "./pages/profile";

const App = () => {
	return (
		<Routes>
			<Route path='/' element={<Home />} exact />
			<Route path='/login' element={<Login />} exact />
			<Route path='/profile' element={<Profile />} exact />
		</Routes>
	);
};

export default App;
