import { useEffect, useRef, useState } from "react";
import "./style.css";
import Picker from "emoji-picker-react";
import EmojiPickerBackground from "./EmojiPickerBackground";
import AddToYourPost from "./AddToYourPost";
import ImagePreview from "./ImagePreview";
import useClickOutside from "../../helpers/clickOutside";
import { createPost } from "../../functions/post";
import PulseLoader from "react-spinners/PulseLoader";
export default function CreatePostPopup({ user, setCreatePostVisible }) {
	const popup = useRef(null);
	const [text, setText] = useState("");
	const [showPrev, setShowPrev] = useState(false);
	const [loading, setLoading] = useState(false);
	const [images, setImages] = useState([]);
	const [background, setBackground] = useState("");

	useClickOutside(popup, () => {
		setCreatePostVisible(false);
	});

	const postSubmit = async () => {
		// when bg is selected
		if (background) {
			setLoading(true);
			const res = await createPost(
				null,
				background,
				text,
				null,
				user.id,
				user.token
			);
			setLoading(false);
			setBackground("");
			setText("");
			setCreatePostVisible(false);
		}
	};
	return (
		<div className='blur'>
			<div className='postBox' ref={popup}>
				<div className='box_header'>
					<div
						className='small_circle'
						onClick={() => {
							setCreatePostVisible((prev) => !prev);
						}}
					>
						<i className='exit_icon'></i>
					</div>
					<span>Create Post</span>
				</div>
				<div className='box_profile'>
					<img src={user.picture} alt='' className='box_profile_img' />
					<div className='box_col'>
						<div className='box_profile_name'>
							{user.first_name} {user.last_name}
						</div>
						<div className='box_privacy'>
							<img src='../../../icons/public.png' alt='' />
							<span>Public</span>
							<i className='arrowDown_icon'></i>
						</div>
					</div>
				</div>

				{!showPrev ? (
					<>
						<EmojiPickerBackground
							text={text}
							user={user}
							setText={setText}
							showPrev={showPrev}
							setBackground={setBackground}
							background={background}
						/>
					</>
				) : (
					<ImagePreview
						text={text}
						user={user}
						setText={setText}
						showPrev={showPrev}
						images={images}
						setImages={setImages}
						setShowPrev={setShowPrev}
					/>
				)}
				<AddToYourPost setShowPrev={setShowPrev} />
				<button
					className='post_submit'
					onClick={() => {
						postSubmit();
					}}
					disabled={loading}
				>
					{loading ? <PulseLoader color='#fff' size={5} /> : "Post"}
				</button>
			</div>
		</div>
	);
}
