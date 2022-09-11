import React from "react";

export default function PostError({ error, setError }) {
	return (
		<div className='postError'>
			<div>{error}</div>
			<button
				className='blue_btn'
				onClick={() => {
					setError("");
				}}
			>
				Try again
			</button>
		</div>
	);
}
