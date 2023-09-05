// router file
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages";


const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />}></Route>
			</Routes>
		</BrowserRouter>
	);
};
export default Router;
