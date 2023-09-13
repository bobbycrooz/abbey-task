// import Button from "@/components/Button";
// import React from "react";
import { BsFilePost } from "react-icons/bs";
// import { GrConnect } from "react-icons/gr";
import { GiShadowFollower } from "react-icons/gi";
import { AiOutlineHome, AiFillEdit } from "react-icons/ai";
import { CgProfile, CgFeed } from "react-icons/cg";
import { BiLogOutCircle, BiSolidUserPlus, BiUserCheck } from "react-icons/bi";

import { useAuth } from "@/context/userContext";
import { RotatingLines } from "react-loader-spinner";
import { connectAPI } from "@/api/endpoints/auth.endpoint";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import EditModal from "@/components/EditModal";
import { Outlet, useLocation, useNavigate, useSearchParams } from "react-router-dom";

const tab = [
	{
		name: "Posts",
		icon: <BsFilePost />,
	},

	{
		name: "Followrs",
		icon: <GiShadowFollower />,
	},

	{
		name: "Connections",
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

const Dashboard = () => {
	const { User, AllUsers, findAndInitUser, getAllUser } = useAuth();
	const [isEditing, seIsEditing] = useState<boolean>(false);
	const [queryParameters] = useSearchParams();
	const filter = queryParameters.get("filter");
	const filterTab = queryParameters.get("tab");
	const navigate = useNavigate();
	const {pathname} = useLocation()
	const [currentTab, setCurrentTab] = useState(tab[0].name);

	async function handleConnet(id: string) {
		const data = {
			myId: User._id,
			peerId: id,
		};

		const { error, serverResponse } = await connectAPI(data);
		if (!error) {
			findAndInitUser();
			getAllUser();
			return toast.success(serverResponse.message);
		}

		// console.log(serverResponse.message);
	}

	function handleLogOut() {
		localStorage.clear();
		navigate("/");
		// console.log(serverResponse.message);
	}

	function handleTabClick(i: string) {
		setCurrentTab(i);
		navigate(`/dashboard/${i.toLowerCase()}`);

		// console.log(serverResponse.message);
	}

	function hasConnected(id: string) {
		const hasConnect = User?.connections?.find((i: any) => i._id == id);

		if (hasConnect) return true;
		return false;
	}

	useEffect(() => {
		if (filter == "edit") {
			seIsEditing(true);
		} else {
			seIsEditing(!true);
		}
	}, [filter]);

	useEffect(() => {
		if (!filterTab) {
			navigate(`/dashboard/${tab[0].name.toLowerCase()}`);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pathname]);

	return (
		<div className="home w-screen min-h-screen flex justify-center">
			<nav className="h-screen  p-4 w-[350px]">
				{/* logo */}
				<button onClick={() => navigate("/")} className="w-full flex items-center">
					<img src="/abbey-arrow.svg" className="w-8 h-8" alt="" />
					<p className="logo font-g-bold text-xl mt-1 ml-3 text-[#002668]">
						Staff <span className="text-[#c81e19]">connect</span>
					</p>
				</button>

				<div className="mt-6  space-y-3">
					{sidetab.map((i: any, k: number) => (
						<div
							key={k}
							className={`nav_btn flex px-3 p-2 w-full rounded-xl hover:bg-gray-100  items-center space-x-2 ${
								k == 0 && "bg-gray-100 ring ring-gray-200 font-medium"
							}`}
						>
							{i.icon}
							<p className="">{i.name}</p>
						</div>
					))}

					<button
						onClick={handleLogOut}
						className={`nav_btn flex px-3 p-2 w-full rounded-xl hover:bg-gray-100  items-center space-x-2 `}
					>
						<BiLogOutCircle />
						<p className="">{"LogOut"}</p>
					</button>
				</div>
			</nav>

			<div className="feeds  min-h-screen border  w-[40%]">
				{/* CORVER */}
				<div
					style={{
						backgroundImage: "url(/flower.jpg)",
						backgroundRepeat: "no-repeat",
						backgroundPosition: "center",
						backgroundSize: "cover",
					}}
					className="corver_photo bg-gray-400 w-full h-[200px] relative"
				>
					{/* AVATAR */}
					<div className="avatar absolute -bottom-[64px]  bg-gray-200 left-4 rounded-full w-32 h-32 centered ring ring-gray-300">
						{/* <img src="https://placebeard.it/640x360" alt="" className="rounded-full w-full h-full" /> */}
						<p className="text-4xl text-gray-400 font-bo">{User?.username?.slice(0, 2).toUpperCase()}</p>
					</div>
				</div>

				{/* EDIT BUTTON */}
				<div className="flex justify-end  mt-3 px-4">
					<button
						onClick={() => navigate("?filter=edit")}
						className="border rounded-xl px-3 p-2 flex items-center space-x-2 border-gray-600 transition-all duration-75 hover:shadow-sm"
					>
						<AiFillEdit />

						<p>Edit Profile</p>
					</button>
				</div>

				{/* NAME ANDUSER NAME */}
				<div className="name_box mt-8 ml-4">
					<h1 className="full_name text-gray-600 font-bold text-xl">
						{User?.fullName?.length > 0 ? User?.fullName : User?.username}
					</h1>
					<p className="username text-sm text-gray-300">@{User?.username}</p>
				</div>

				{/* BIO */}
				<div className="bio text-sm font-medium text-gray-400 ml-4 mt-3">
					<p>{User?.bio?.length > 0 ? User?.bio : "Edit your profile to Update bio."}</p>
				</div>

				{/* FOLLOWERS */}
				<div className="flex ml-4 mt-2">
					<div className="followers">
						<p className="connet flex space-x-2 text-gray-500">
							<strong>{User?.connections?.length}</strong> <span className="text-gray-500">Connections</span>
						</p>
					</div>
				</div>

				{/* TABS */}
				<ul className="w-full flex h-11  items-center border-b-2  justify-around mt-6">
					{tab.map((i: any, k: number) => (
						<li
							onClick={() => handleTabClick(i.name)}
							key={k}
							role={"button"}
							className={`tab-item centered px-3 p-2 hover:bg-gray-100 rounded-xl  space-x-2 hover:text-abbey-pri hover:font-medium ${
								currentTab == i.name ? "text-abbey-pri font-medium" : "text-gray-500 font-normal"
							}`}
						>
							{i.icon}
							<p>{i.name}</p>
						</li>
					))}
				</ul>

				{/* content */}
				<Outlet />
			</div>

			<aside className="h-screen min-w-[360px] p-6">
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
					{AllUsers?.length > 0 ? (
						AllUsers.map((i: any, k: number) => (
							<div key={k} className="user_card flex p-2  rounded-xl bg-white items-center justify-between shadow">
								<div role="button" className="flex items-center space-x-2">
									<div className="avatar rounded-full w-11 h-11 bg-gray-100 text-gray-300 centered">
										<p>{i?.username?.slice(0, 2).toUpperCase()}</p>
									</div>

									<div className="name flex flex-col items-start">
										<h1 className="full_name text-gray-600 font-medium">@{i.username}</h1>
										<p className="username text-sm text-gray-300">{i.email.slice(0, 12)}...</p>
									</div>
								</div>

								{/* <Button icon={BiSolidUserPlus} text={"Connet"} type={undefined} primary /> */}

								{hasConnected(i._id) ? (
									<button
										// onClick={}
										className="border rounded-xl px-2 p-1 flex items-center space-x-2 border-green-500 text-green-500"
									>
										<BiUserCheck className="text-green-500" />

										<p>Connected</p>
									</button>
								) : (
									<button
										onClick={() => handleConnet(i._id)}
										className="border rounded-xl px-2 p-1 flex items-center space-x-2 border-[#002668]"
									>
										<BiSolidUserPlus />

										<p>Connect</p>
									</button>
								)}
							</div>
						))
					) : (
						<div className="loading w-full centered">
							<RotatingLines strokeColor="grey" strokeWidth="5" animationDuration="0.75" width="36" visible={true} />
						</div>
					)}
				</div>
			</aside>

			<EditModal showModal={isEditing} />
		</div>
	);
};

export default Dashboard;
