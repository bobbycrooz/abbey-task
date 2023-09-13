// router file
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "./pages/random";
import Social from "./pages/social";
import Dashboard from "./pages/social/dashboard";


const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Social />}></Route>
				<Route path="/dashboard" element={<Dashboard />}></Route>
				{/* <Route path="/" element={<Home />}></Route> */}
			</Routes>
		</BrowserRouter>
	);
};
export default Router;
