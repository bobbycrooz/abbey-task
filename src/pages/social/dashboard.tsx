// import Button from "@/components/Button";
// import React from "react";
import { BsFilePost } from "react-icons/bs";
// import { GrConnect } from "react-icons/gr";
import { GiShadowFollower } from "react-icons/gi";
import { AiOutlineHome, AiFillEdit } from "react-icons/ai";
import { CgProfile, CgFeed } from "react-icons/cg";
import { BiSolidUserPlus } from "react-icons/bi";
import { FiPlus } from "react-icons/fi";

const Dashboard = () => {
	const tab = [
		{
			name: "Post",
			icon: <BsFilePost />,
		},

		{
			name: "Followrs",
			icon: <GiShadowFollower />,
		},

		{
			name: "Connect",
			icon: <BiSolidUserPlus />,
		},
	];

	const sidetab = [
		{
			name: "Home",
			icon: <AiOutlineHome />,
		},

		{
			name: "Profile",
			icon: <CgProfile />,
		},

		{
			name: "Feeds",
			icon: <CgFeed />,
		},
	];

	return (
		<div className="home w-screen h-screen flex justify-center">
			<nav className="h-screen  p-4 w-[350px]">
				{/* logo */}
				<div className="w-full flex items-center">
					<img src="/abbey-arrow.svg" className="w-8 h-8" alt="" />
					<p className="logo font-g-bold text-xl mt-1 ml-3 text-[#002668]">
						Staff <span className="text-[#c81e19]">connect</span>
					</p>
				</div>

				<div className="mt-6  space-y-3">
					{sidetab.map((i: any, k: number) => (
						<div
							key={k}
							className={`nav_btn flex px-3 p-2 w-full rounded-xl hover:bg-gray-100  items-center space-x-2 ${k == 0 && "bg-gray-100 ring ring-gray-200 font-medium" }`}
						>
							{i.icon}
							<p className="">{i.name}</p>
						</div>
					))}
				</div>
			</nav>

			<div className="feeds  h-screen border  w-[40%]">
				{/* CORVER */}
        <div style={{
          backgroundImage: "url(/flower.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover"
        }} className="corver_photo bg-gray-400 w-full h-[200px] relative">
					{/* AVATAR */}
          <div className="avatar absolute -bottom-[64px]  bg-gray-200 left-4 rounded-full w-32 h-32 centered ring ring-gray-300"> 
            {/* <img src="https://placebeard.it/640x360" alt="" className="rounded-full w-full h-full" /> */}
            <p className="text-4xl text-gray-400 font-bo">
              II
            </p>
          </div>
				</div>

				{/* EDIT BUTTON */}
				<div className="flex justify-end  mt-3 px-4">
					<button className="border rounded-xl px-3 p-2 flex items-center space-x-2 border-gray-600 transition-all duration-75 hover:shadow-sm">
						<AiFillEdit />

						<p>Edit Profile</p>
					</button>
				</div>

				{/* NAME ANDUSER NAME */}
				<div className="name_box mt-8 ml-4">
					<h1 className="full_name text-gray-600 font-bold text-xl">idris 🤓 Ifeoluwa</h1>
					<p className="username text-sm text-gray-300">@bobbydev</p>
				</div>

				{/* BIO */}
				<div className="bio text-sm font-medium text-gray-400 ml-4 mt-3">
					<p>software engineer at goodle | fulstack at dokRx.</p>
				</div>

				{/* FOLLOWERS */}
				<div className="flex ml-4 mt-2">
					<div className="followers">
						<p className="connet flex space-x-2 text-gray-500">
							<strong>2,400</strong> <span className="text-gray-500">Connections</span>
						</p>
					</div>
				</div>

				{/* TABS */}

				<ul className="w-full flex h-11  items-center border-b-2  justify-around mt-6">
					{tab.map((i: any, k: number) => (
						<li
							key={k}
							className={`tab-item centered px-3 p-2  space-x-2 hover:text-abbey-pri hover:font-medium ${
								k == 0 ? "text-abbey-pri font-medium" : "text-gray-500 font-normal"
							}`}
						>
							{i.icon}
							<p>{i.name}</p>
						</li>
					))}
				</ul>

				{/* content */}
				<div className="content_box flex flex-col items-center p-4 space-y-4">
					<h1 className="nothing">No post found, try creating a post</h1>

					{/* <Button ghost text={"Create"} type={undefined} /> */}
					<button className="border rounded-xl px-3 p-2 flex items-center space-x-2 border-gray-600 transition-all duration-75 hover:shadow-sm">
						<FiPlus />

						<p>Create</p>
					</button>
				</div>
			</div>

			<aside className="h-screen min-w-[360px] p-6 ">
				<div className="search">
					<input
						type="search"
						name="search"
						id=""
						placeholder="Search.."
						className="w-full rounded-xl bg-gray-100 p-2 px-6 "
					/>
				</div>

				<div className="users space-y-2 mt-6">
					{[1, 1, 1, 1, 1].map((_, k: number) => (
						<div key={k} className="user_card flex p-2  rounded-xl bg-white items-center justify-between shadow">
							<div className="flex items-center space-x-2">
								<div className="avatar rounded-full w-11 h-11 bg-gray-100"></div>

								<div className="name flex flex-col items-start">
									<h1 className="full_name text-gray-600 font-medium">idris 🤓 Ifeoluwa</h1>
									<p className="username text-sm text-gray-300">@bobbydev</p>
								</div>
							</div>

							{/* <Button icon={BiSolidUserPlus} text={"Connet"} type={undefined} primary /> */}

							<button className="border rounded-xl px-2 p-1 flex items-center space-x-2 border-[#002668]">
								<BiSolidUserPlus />

								<p>Connect</p>
							</button>
						</div>
					))}
				</div>
			</aside>
		</div>
	);
};

export default Dashboard;
