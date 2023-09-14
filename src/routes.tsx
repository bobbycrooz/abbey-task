// router file
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "./pages/random";
import Social from "./pages/social";
import Dashboard from "./pages/social/dashboard";
import Connections from "./pages/social/connections";
import Posts from "./pages/social/posts";
import Users from "./pages/social/Users";

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Social />}></Route>
				<Route path="/dashboard" element={<Dashboard />}>
					<Route path="/dashboard/posts" element={<Posts />}></Route>
					<Route path="/dashboard/connections" element={<Connections />}></Route>
					<Route path="/dashboard/users" element={<Users />}></Route>
				</Route>

				{/* <Route path="/" element={<Home />}></Route> */}
			</Routes>
		</BrowserRouter>
	);
};
export default Router;
