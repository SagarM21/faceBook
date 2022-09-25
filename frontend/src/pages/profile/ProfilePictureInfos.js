import { useState } from "react";
import ProfilePicture from "../../components/profilePicture";
export default function ProfilePictureInfos({ profile, visitor }) {
	const [show, setShow] = useState(true);
	return (
		<div className='profile_img_wrap'>
			{show && <ProfilePicture />}
			<div className='profile_w_left'>
				<div className='profile_w_img'>
					<div
						className='profile_w_bg'
						style={{
							backgroundSize: "cover",
							backgroundImage: `url(${profile.picture})`,
						}}
					></div>
					{!visitor && (
						<div className='profile_circle hover1'>
							<i className='camera_filled_icon'></i>
						</div>
					)}
				</div>

				<div className='profile_w_col'>
					<div className='profile_name'>
						{profile.first_name} {profile.last_name}
						<div className='othername'>(OtherName)</div>
					</div>
					<div className='profile_friend_count'></div>
					<div className='profile_friend_imgs'></div>
				</div>
			</div>

			{visitor ? (
				""
			) : (
				<div className='profile_w_right'>
					<div className='blue_btn'>
						<img src='../../../icons/plus.png' alt='' className='invert' />
						<span>Add to Story</span>
					</div>
					<div className='gray_btn'>
						<img src='edit_icon' alt='' />
						<span>Edit Profile</span>
					</div>
				</div>
			)}
		</div>
	);
}
