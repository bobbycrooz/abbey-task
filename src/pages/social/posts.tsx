import { FiPlus } from "react-icons/fi";

const Posts = () => {

	return (
		<div className="content_box flex flex-col items-center p-4 space-y-4">
			<h1 className="nothing">No post found, try creating a post</h1>

			{/* <Button ghost text={"Create"} type={undefined} /> */}
			<button className="border rounded-xl px-3 p-2 flex items-center space-x-2 border-gray-600 transition-all duration-75 hover:shadow-sm">
				<FiPlus />

				<p>Create</p>
			</button>
		</div>
	);
};

export default Posts;
