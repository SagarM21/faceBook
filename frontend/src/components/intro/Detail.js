import { useState } from "react";
import Bio from "./Bio";

export default function Detail({
	header,
	img,
	value,
	placeholder,
	name,
	handleChange,
	updateDetails,
	infos,
	text,
}) {
	const [show, setShow] = useState(true);
	return (
		<div>
			<div className='details_header'>{header}</div>
			<div className='add_details_flex ' onClick={() => setShow(true)}>
				{value ? (
					<div className='info_profile'>
						<img src={`../../../icons/${img}.png`} alt='' />
						{value}
						<i className='edit_icon'></i>
					</div>
				) : (
					<>
						<i className='rounded_plus_icon'></i>
						<span className='underline'>Add {text}</span>
					</>
				)}
			</div>
			{show && (
				<Bio
					placeholder={placeholder}
					name={name}
					handleChange={handleChange}
					updateDetails={updateDetails}
					infos={infos}
					setShow={setShow}
					detail
				/>
			)}
		</div>
	);
}
