import Footer from "../../components/login/Footer";
import LoginForm from "../../components/login/LoginForm";
import RegisterForm from "../../components/login/RegisterForm";
import "./style.css";

export default function Login() {
	return (
		<div className='login'>
			<div className='login_wrapper'>
				<LoginForm />
				<RegisterForm />
				<Footer />
			</div>
		</div>
	);
}
