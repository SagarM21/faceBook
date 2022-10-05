import { useRef } from "react";
import { useState } from "react";
import ProfilePicture from "../../components/profilePicture";
import Friendship from "./Friendship";
export default function ProfilePictureInfos({
	profile,
	visitor,
	photos,
	otherName,
}) {
	const [show, setShow] = useState(false);
	const pRef = useRef(null);
	return (
		<div className='profile_img_wrap'>
			{show && <ProfilePicture setShow={setShow} pRef={pRef} photos={photos} />}
			<div className='profile_w_left'>
				<div className='profile_w_img'>
					<div
						className='profile_w_bg'
						ref={pRef}
						style={{
							backgroundSize: "cover",
							backgroundImage: `url(${profile.picture})`,
						}}
					></div>
					{!visitor && (
						<div
							className='profile_circle hover1'
							onClick={() => setShow(true)}
						>
							<i className='camera_filled_icon'></i>
						</div>
					)}
				</div>

				<div className='profile_w_col'>
					<div className='profile_name'>
						{profile.first_name} {profile.last_name}
						<div className='othername'>{otherName && `(${otherName})`}</div>
					</div>
					<div className='profile_friend_count'></div>
					<div className='profile_friend_imgs'></div>
				</div>
			</div>

			{visitor ? (
				<Friendship friendship={profile?.friendship} />
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
