import { useEffect, useRef, useState } from "react";
import "./style.css";
import EmojiPickerBackground from "./EmojiPickerBackground";
export default function CreatePostPopup({ user }) {
	const [text, setText] = useState("");
	const [showPrev, setShowPrev] = useState(false);
	const textRef = useRef(null);
	// console.log(text);
	return (
		<div className='blur'>
			<div className='postBox'>
				<div className='box_header'>
					<div className='small_circle'>
						<i className='exit_icon'></i>
					</div>
					<span>Create Post</span>
				</div>
				<div className='box_profile'>
					<img src={user?.picture} alt='' className='box_profile_img' />
					<div className='box_col'>
						<div className='box_profile_name'>
							{user?.first_name} {user?.last_name}
						</div>
						<div className='box_privacy'>
							<img src='../../../icons/public.png' alt='' />
							<span>Public</span>
							<i className='arrowDown_icon'></i>
						</div>
					</div>
				</div>

				{!showPrev && (
					<div className='flex_center'>
						<textarea
							ref={textRef}
							maxLength='100'
							value={text}
							placeholder={`What's on your mind, ${user?.first_name}`}
							className='post_input'
							onChange={(e) => setText(e.target.value)}
						></textarea>
					</div>
				)}
				<EmojiPickerBackground
					text={text}
					textRef={textRef}
					setText={setText}
				/>
			</div>
		</div>
	);
}
