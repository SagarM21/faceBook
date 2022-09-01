import React, { useRef, useState } from "react";
import Header from "../../components/header";
import useClickOutside from "../../helpers/clickOutside";

const Home = () => {
	const [visible, setVisible] = useState(false);
	const el = useRef(null);
	useClickOutside(el, () => {
		setVisible(false);
	});
	return (
		<div className=''>
			<Header />
			{visible && <div className='card' ref={el}></div>}
		</div>
	);
};

export default Home;
