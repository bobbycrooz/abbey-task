import { useAuth } from "@/context/userContext";
import { RotatingLines } from "react-loader-spinner";

const Connections = () => {
	const { User } = useAuth();



	return (
		<div className="connection_list p-4 space-y-3">
			{User?.connections?.length > 0 ? (
				User?.connections?.map((i: any, k: number) => (
					<div key={k} className="user_card flex p-2  rounded-xl bg-white items-center justify-between shadow">
						<div role="button" className="flex items-center space-x-2">
							<div className="avatar rounded-full w-11 h-11 bg-gray-100 text-gray-300 centered">
								<p>{i?.username?.slice(0, 2).toUpperCase()}</p>
							</div>

							<div className="name flex flex-col items-start">
								<h1 className="full_name text-gray-600 font-medium">@{i.username}</h1>
								<p className="username text-sm text-gray-300">{i.email}</p>
							</div>
						</div>
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

export default Connections;
