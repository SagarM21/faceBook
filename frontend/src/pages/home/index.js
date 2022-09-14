import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import Header from "../../components/header";
import LeftHome from "../../components/home/left";
import RightHome from "../../components/home/right";
import Stories from "../../components/home/stories";
import CreatePost from "../../components/createPost";
import "./style.css";
import SendVerification from "../../components/home/sendVerification";
import Post from "../../components/post";
export default function Home({ setCreatePostVisible, posts }) {
	const { user } = useSelector((state) => ({ ...state }));
	return (
		<div className='home'>
			<Header />
			<LeftHome user={user} />
			<div className='home_middle'>
				<Stories />
				{user.verified === false && <SendVerification user={user} />}

				<CreatePost user={user} setCreatePostVisible={setCreatePostVisible} />
				<div className='posts'>
					{posts.map((post) => (
						<div className='post' key={post._id}>
							<Post key={post._id} post={post} />
						</div>
					))}
				</div>
			</div>
			<RightHome user={user} />
		</div>
	);
}
