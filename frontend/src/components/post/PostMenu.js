import { useRef, useState } from "react";
import MenuItem from "./MenuItem";
import useOnClickOutside from "../../helpers/clickOutside";
import { savePost } from "../../functions/post";

export default function PostMenu({
	postUserId,
	userId,
	imagesLength,
	setShowMenu,
	postId,
	token,
	checkSaved,
	setCheckSaved,
}) {
	const [myPost, setMyPost] = useState(postUserId === userId ? true : false);
	const menu = useRef(null);
	useOnClickOutside(menu, () => setShowMenu(false));
	const saveHandler = async () => {
		savePost(postId, token);
		if (checkSaved) {
			setCheckSaved(false);
		} else {
			setCheckSaved(true);
		}
	};
	return (
		<ul className='post_menu' ref={menu}>
			{myPost && <MenuItem icon='pin_icon' title='Pin Post' />}
			<div onClick={() => saveHandler()}>
				{checkSaved ? (
					<MenuItem
						icon='save_icon'
						title='Unsave Post'
						subtitle='Remove this from your saved items.'
					/>
				) : (
					<MenuItem
						icon='save_icon'
						title='Save Post'
						subtitle='Add this to your saved items.'
					/>
				)}
			</div>
			<div className='line'></div>
			{myPost && <MenuItem icon='edit_icon' title='Edit Post' />}
			{!myPost && (
				<MenuItem
					icon='turnOnNotification_icon'
					title='Turn on notifications for this post'
				/>
			)}
			{imagesLength && <MenuItem icon='download_icon' title='Download' />}
			{imagesLength && (
				<MenuItem icon='fullscreen_icon' title='Enter Fullscreen' />
			)}
			{myPost && (
				<MenuItem img='../../../icons/lock.png' title='Edit audience' />
			)}
			{myPost && (
				<MenuItem
					icon='turnOffNotifications_icon'
					title='Turn off notifications for this post'
				/>
			)}
			{myPost && <MenuItem icon='delete_icon' title='Turn off translations' />}
			{myPost && <MenuItem icon='date_icon' title='Edit Date' />}
			{myPost && (
				<MenuItem icon='refresh_icon' title='Refresh share attachment' />
			)}
			{myPost && <MenuItem icon='archive_icon' title='Move to archive' />}
			{myPost && (
				<MenuItem
					icon='trash_icon'
					title='Move to trash'
					subtitle='items in your trash are deleted after 30 days'
				/>
			)}
			{!myPost && <div className='line'></div>}
			{!myPost && (
				<MenuItem
					img='../../../icons/report.png'
					title='Report post'
					subtitle="i'm concerned about this post"
				/>
			)}
		</ul>
	);
}
