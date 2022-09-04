import { useEffect } from "react";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CreatePost from "../../components/createPost";
import Header from "../../components/header";
import LeftHome from "../../components/home/left";
import RightHome from "../../components/home/right";
import Stories from "../../components/home/stories";
import ActivateForm from "./ActivateForm";
import "./style.css";
import axios from "axios";
export default function Activate() {
	const { user } = useSelector((user) => ({ ...user }));
	const [success, setSuccess] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(true);
	const { token } = useParams();
	useEffect(() => {
		activateAccount();
	}, []);

	const activateAccount = async () => {
		try {
			setLoading(true);
			const { data } = await axios.post(
				`${process.env.REACT_APP_BACKEND_URL}/activate`,
				{ token },
				{
					headers: {
						Authorization: `Bearer ${user.token}`,
					},
				}
			);

			setSuccess(data.message);
		} catch (error) {
			setError(error.response.data.message);
		}
	};
	return (
		<div className='home'>
			{success && (
				<ActivateForm
					type='success'
					header='Account verification succeeded.'
					text={success}
					loading={loading}
				/>
			)}
			{error && (
				<ActivateForm
					type='error'
					header='Account verification failed.'
					text={error}
					loading={loading}
				/>
			)}
			<Header />
			<LeftHome user={user} />
			<div className='home_middle'>
				<Stories />
				<CreatePost user={user} />
			</div>
			<RightHome user={user} />
		</div>
	);
}
