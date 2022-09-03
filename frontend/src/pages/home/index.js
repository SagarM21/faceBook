import { useSelector } from "react-redux";
import Header from "../../components/header";
import LeftHome from "../../components/home/left";
import RightHome from "../../components/home/right";

const Home = () => {
	const { user } = useSelector((user) => ({ ...user }));
	return (
		<div>
			<Header />
			<LeftHome user={user} />
			<RightHome user={user} />
		</div>
	);
};

export default Home;
