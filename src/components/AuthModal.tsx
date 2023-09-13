import  { FormEvent, useEffect, useRef, useState } from "react";
import {   useNavigate, useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import InputField from "./InputField";
import Button from "./Button";

interface ModalTypes {
	showModal: boolean;
}

const AuthModal = ({ showModal }: ModalTypes) => {
	const [queryParameters] = useSearchParams();
	const filter = queryParameters.get("filter");
	// const { pathname } = useLocation();
	const [authMode, setAuthMode] = useState<boolean>();
	const navigate = useNavigate();
	const modalRef = useRef(null);
	const [LoginIn, setLoginIn] = useState<boolean>();

	useEffect(() => {
		if (filter == "auth") {
			setAuthMode(true);
		}
	}, [filter]);

	function handleSubmit(e: FormEvent<HTMLElement>) {
		e.preventDefault();
		navigate("dashboard");
	}

	function handleBackDropt(e: any) {
		if (showModal && modalRef.current == e.target) {
			navigate("/");
		}
	}

	console.log(authMode);
	
	return showModal ? (
		<AnimatePresence>
			<motion.div
				key={"modal-2"}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0, x: 100 }}
				className="fixed top-0 left-0 bg-[#000000ba] centered w-screen h-screen fadeIn"
				onClick={handleBackDropt}
				ref={modalRef}
			>
				<div className="card bg-white rounded-xl w-[60%] h-[520px] flex ">
					<div className="auth_box w-1/2 p-8">
						<div className="w-full space-y-6">
							{/* head */}
							<div className="flex justify-start items-center space-x-3">
								<div
									role="button"
									
									onClick={() => setLoginIn(!true)}
									className={`space-x-2 flex  px-4 p-2 rounded   ${
										!LoginIn ? "border border-[#002668] font-medium text-[#002668]" : "text-[#00266890]"
									} `}
								>
									{/* <img src="/abbey-lock.svg" className="w-6 h-6 " alt="" /> */}
									<h1 className="auth_card-title">Sign Up</h1>
								</div>

								<div
									role="button"
									onClick={() => setLoginIn(true)}
									className={`space-x-2 flex  px-4 p-2 rounded   ${
										LoginIn ? "border border-[#002668] font-medium text-[#002668]" : "text-[#00266890]"
									} `}
								>
									{/* <img src="/abbey-lock.svg" className="w-6 h-6 " alt="" /> */}
									<h1 className="auth_card-title  ">Log In</h1>
								</div>

								{/* mode */}
							</div>

							{/* auth form */}
							<form onSubmit={handleSubmit} className="form flex flex-col space-y-2 mt-4 w-full ">
							{!LoginIn &&	<InputField label={"Username"} type={"text"} />}
								<InputField label={"Email"} type={"email"} />
								<InputField label={"Password"} type={"password"} />
								<Button primary text={LoginIn ? "Log In" : "Sign Up"} type={undefined} />
							</form>

							<div className="or border w-full relative border-dashed">
								<h1 className=" absolute left-1/2 -translate-x-1/2 -mt-5 bg-white p-2 px-4">Or</h1>
							</div>

							<div className="social border border-[#002668] rounded w-full p-2 centered">
								<h2 className=" font-medium text-[#002668]">{LoginIn ? "Log In" : "Sign Up"} with Google</h2>
							</div>
						</div>
					</div>
					<div className="illus w-1/2 h-full rounded-xl"></div>
				</div>
			</motion.div>
		</AnimatePresence>
	) : null;
};

export default AuthModal;
