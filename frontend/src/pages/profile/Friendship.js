import { useEffect } from "react";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
	addFriend,
	cancelRequest,
	follow,
	unFollow,
} from "../../functions/user";
import useClickOutside from "../../helpers/clickOutside";

export default function Friendship({ friendshipp, profileId }) {
	const [friendship, setFriendship] = useState(friendshipp);
	useEffect(() => {
		setFriendship(friendship);
	}, [friendshipp]);
	const [friendsMenu, setFriendsMenu] = useState(false);
	const [respondMenu, setRespondMenu] = useState(false);
	const menu = useRef(null);
	const menu1 = useRef(null);
	useClickOutside(menu, () => setFriendsMenu(false));
	useClickOutside(menu1, () => setRespondMenu(false));

	const { user } = useSelector((state) => ({ ...state }));
    
	const addFriendHandler = async () => {
		setFriendship({ ...friendship, requestSent: true, following: true });
		addFriend(profileId, user.token);
	};
	const cancelRequestHandler = async () => {
		setFriendship({ ...friendship, requestSent: false, following: false });
		cancelRequest(profileId, user.token);
	};
	const followHandler = async () => {
		setFriendship({ ...friendship, following: true });
		follow(profileId, user.token);
	};
	const unFollowHandler = async () => {
		setFriendship({ ...friendship, following: false });
		unFollow(profileId, user.token);
	};
	console.log(friendship?.requestReceived);
	return (
		<div className='friendship'>
			{friendship?.friends ? (
				<div className='friends_menu_wrap'>
					<button className='gray_btn' onClick={() => setFriendsMenu(true)}>
						<img src='../../../icons/friends.png' alt='' />
						<span>Friends</span>
					</button>
					{friendsMenu && (
						<div className='open_cover_menu' ref={menu}>
							<div className='open_cover_menu_item hover1'>
								<img src='../../../icons/favoritesOutline.png' alt='' />
								Favorites
							</div>
							<div className='open_cover_menu_item hover1'>
								<img src='../../../icons/editFriends.png' alt='' />
								Edit Friend list
							</div>
							{friendship?.following ? (
								<div
									className='open_cover_menu_item hover1'
									onClick={() => unFollowHandler()}
								>
									<img src='../../../icons/unfollowOutlined.png' alt='' />
									Unfollow
								</div>
							) : (
								<div
									className='open_cover_menu_item hover1'
									onClick={() => followHandler()}
								>
									<img src='../../../icons/unfollowOutlined.png' alt='' />
									Follow
								</div>
							)}
							<div className='open_cover_menu_item hover1'>
								<i className='unfriend_outlined_icon'></i>
								Unfriend
							</div>
						</div>
					)}
				</div>
			) : (
				!friendship?.requestSent &&
				!friendship?.requestReceived && (
					<button className='blue_btn' onClick={() => addFriendHandler()}>
						<img src='../../../icons/addFriend.png' alt='' className='invert' />
						<span>Add Friend</span>
					</button>
				)
			)}
			{friendship?.requestSent ? (
				<button className='blue_btn' onClick={() => cancelRequestHandler()}>
					<img
						src='../../../icons/cancelRequest.png'
						className='invert'
						alt=''
					/>
					<span>Cancel Request</span>
				</button>
			) : (
				friendship?.requestReceived && (
					<div className='friends_menu_wrap'>
						<button className='gray_btn' onClick={() => setRespondMenu(true)}>
							<img src='../../../icons/friends.png' alt='' />
							<span>Respond</span>
						</button>
						{respondMenu && (
							<div className='open_cover_menu' ref={menu1}>
								<div className='open_cover_menu_item hover1'>Confirm</div>
								<div className='open_cover_menu_item hover1'>Delete</div>
							</div>
						)}
					</div>
				)
			)}
			{friendship?.following ? (
				<button className='gray_btn' onClick={() => unFollowHandler()}>
					<img src='../../../icons/follow.png' alt='' />
					<span>Following</span>
				</button>
			) : (
				<button className='blue_btn' onClick={() => followHandler()}>
					<img src='../../../icons/follow.png' className='invert' alt='' />
					<span>Follow</span>
				</button>
			)}
			<button className={friendship?.friends ? "blue_btn" : "gray_btn"}>
				<img
					src='../../../icons/message.png'
					className={friendship?.friends && "invert"}
					alt=''
				/>
				<span>Message</span>
			</button>
		</div>
	);
}
