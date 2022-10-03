import Detail from "./Detail";

export default function EditDetails({
	details,
	handleChange,
	updateDetails,
	infos,
}) {
	return (
		<div className='blur'>
			<div className='postBox infosBox'>
				<div className='box_header'>
					<div className='small_circle'>
						<i className='exit_icon'></i>
					</div>
					<span>Edit Details</span>
				</div>
				<div className='details_wrapper scrollbar'>
					<div className='details_col'>
						<span>Customize Your Intro</span>
						<span>Details you select will be public</span>
					</div>
					<Detail
						header='Other Name'
						value={details?.otherName}
						img='studies'
						placeholder='add other name'
						name='otherName'
						text='Other Name'
						handleChange={handleChange}
						updateDetails={updateDetails}
						infos={infos}
					/>
				</div>
			</div>
		</div>
	);
}
