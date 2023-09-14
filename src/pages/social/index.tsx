import  {  useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import Button from "@/components/Button";
import AuthModal from "@/components/AuthModal";

const Social = () => {
	const [queryParameters] = useSearchParams();
	const filter = queryParameters.get("filter");
	// const { pathname } = useLocation();
	const [authMode, setAuthMode] = useState<boolean>(false);
	const navigate = useNavigate();

	useEffect(() => {
		if (filter == "auth") {
			setAuthMode(true);
		} else {
			setAuthMode(!true);
		}
	}, [filter]);

	

	return (
		<>
			<div className="abbey w-screen h-screen relative">
				<div className="absolute  top-0 left-0 w-full h-full bg-[#0000007b]"/>
                        
                        <div className="info_card absolute top-1/2 md:left-8 -translate-y-1/2 w-[95%] left-1/2 -translate-x-1/2 md:translate-x-0  shadow bg-white rounded-xl p-5 md:w-[400px] space-y-3">
                              
                              <img src="/abbey-arrow.svg" className="w-11 h-11" alt="" />
					<h1 className="card_title text-[#002668] font-bold text-3xl">Stay connected with your collegues</h1>

					<p className="card_body text-[#002668]">
						Connect with your staffs at abbey mogage bank, share ideas post and picture about your lifestyle and enhance
						the beauty of your life.
					</p>

					<Button click={() => navigate("/?filter=auth")} text={"Connect"} type={"button"} primary />
				</div>
			</div>

			{/* auth modal */}
			<AuthModal showModal={authMode} />
		</>
	);
};

export default Social;
