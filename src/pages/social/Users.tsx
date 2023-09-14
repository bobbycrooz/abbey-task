import { useAuth } from "@/context/userContext";
import { RotatingLines } from "react-loader-spinner";
import { connectAPI } from "@/api/endpoints/auth.endpoint";
import toast from "react-hot-toast";
import { BiSolidUserPlus, BiUserCheck } from "react-icons/bi";

const Users = () => {
	const { User, AllUsers, findAndInitUser, getAllUser } = useAuth();

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

	function hasConnected(id: string) {
		const hasConnect = User?.connections?.find((i: any) => i._id == id);

		if (hasConnect) return true;
		return false;
	}
	return (
		<div className="users space-y-2 mt-2 p-4">
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
	);
};

export default Users;
