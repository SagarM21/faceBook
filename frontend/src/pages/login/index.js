
import Footer from "../../components/login/Footer";
import LoginForm from "../../components/login/LoginForm";
import "./style.css";

export default function Login() {
	return (
		<div className='login'>
			<div className='login_wrapper'>
				<LoginForm />
				<div className='register'></div>
				<Footer />
			</div>
		</div>
	);
}
