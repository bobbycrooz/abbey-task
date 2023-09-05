import Router from "./routes";

import { SkeletonTheme } from "react-loading-skeleton";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";

export default function App() {
	return (
		<SkeletonTheme baseColor="#d9d9d9" highlightColor="#aaa">
			<ToastContainer />
			<Router />
		</SkeletonTheme>
	);
}
