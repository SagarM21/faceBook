import EmojiPickerBackground from "./EmojiPickerBackground";
export default function ImagePreview({ text, user, setText }) {
	return (
		<div className='overflow_a'>
			<EmojiPickerBackground text={text} user={user} setText={setText} type2/>
		</div>
	);
}
