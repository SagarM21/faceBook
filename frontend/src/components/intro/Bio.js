export default function Bio({
	infos,
	handleChange,
	max,
	setShowBio,
	updateDetails,
	placeholder,
	name,
	detail,
	setShow,
}) {
	return (
		<div className='add_bio_wrap'>
			<textarea
				placeholder={placeholder}
				name={name}
				value={infos?.[name]} // this bracket means the data will be prefilled if exists in db
				maxLength='100'
				className='textarea_blue details_input'
				onChange={handleChange}
			></textarea>
			{!detail && <div className='remaining'>{max} characters remaining</div>}
			<div className='flex'>
				<div className='flex flex_left'>
					<i className='public_icon'></i>Public
				</div>
				<div className='flex flex_right'>
					<button
						className='gray_btn'
						onClick={() => (!detail ? setShowBio(false) : setShow(false))}
					>
						Cancel
					</button>
					<button
						className='blue_btn'
						onClick={() => {
							updateDetails();
							setShow(false);
						}}
					>
						Save
					</button>
				</div>
			</div>
		</div>
	);
}
