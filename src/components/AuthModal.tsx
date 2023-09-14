import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import InputField from "./InputField";
import Button from "./Button";
import { useAuth } from "@/context/userContext";
import toast from "react-hot-toast";

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
	const [isLoading, setisLoading] = useState<boolean>(false);
	const { authService } = useAuth();
	const [cred, setcred] = useState({
		email: "",
		password: "",
		username: "",
	});

	useEffect(() => {
		if (filter == "auth") {
			setAuthMode(true);
			setLoginIn(true);
		}
	}, [filter]);

	async function handleSubmit(e: FormEvent<HTMLElement>) {
		e.preventDefault();
		setisLoading(true);

		if (LoginIn) {
			const valid = cred.email.length > 1 && cred.password.length > 1;

			if (!valid) {
				setisLoading(false);
				return toast.error("All fields are required");
			}

			const loginSuccess = await authService.logIn(cred);

			if (loginSuccess) {
				setisLoading(false);
				navigate("dashboard");
			}
		} else {
			const valid = cred.username.length > 1 && cred.email.length > 1 && cred.password.length > 1;

			if (!valid) {
				setisLoading(false);
				return toast.error("All fields are required");
			}

			const registeruccess = await authService.register(cred);

			if (registeruccess) {
				setisLoading(false);
				navigate("dashboard");
			}
		}

		setisLoading(false);
	}

	function handleBackDropt(e: any) {
		if (showModal && modalRef.current == e.target) {
			navigate("/");
		}
	}

	console.log(authMode, LoginIn);

	function handleFieldChange(e: ChangeEvent<HTMLInputElement>, fieldName: string) {
		e.preventDefault();

		const { value } = e.target;

		setcred({
			...cred,
			[fieldName]: value,
		});
	}

	return showModal ? (
		<AnimatePresence>
			<motion.div
				key={"modal-2"}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				className="fixed top-0 left-0 bg-[#00000070] centered w-screen h-screen fadeIn"
				onClick={handleBackDropt}
				ref={modalRef}
			>
				<div className="card bg-white rounded-xl md:w-[60%] md:h-[460px] flex w-[95%]">
					<div className="auth_box md:w-1/2 md:p-8 p-4 py-8 md:py-8 w-full">
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
								{!LoginIn && (
									<InputField
										label={""}
										type={"text"}
										value={cred.username}
										filedName="username"
										change={handleFieldChange}
										place={"Username"}
									/>
								)}
								<InputField
									label={""}
									type={"email"}
									value={cred.email}
									filedName="email"
									change={handleFieldChange}
									place={"Email"}
								/>
								<InputField
									label={""}
									type={"password"}
									value={cred.password}
									filedName="password"
									change={handleFieldChange}
									place={"Password"}
								/>
								<Button isLoading={isLoading} primary text={LoginIn ? "Log In" : "Sign Up"} type={undefined} />
							</form>

							<div className="or border w-full relative border-dashed">
								<h1 className=" absolute left-1/2 -translate-x-1/2 -mt-5 bg-white p-2 px-4">Or</h1>
							</div>

							<div className="social border border-[#002668] rounded w-full p-2 centered">
								<h2 className=" font-medium text-[#002668]">{LoginIn ? "Log In" : "Sign Up"} with Google</h2>
							</div>
						</div>
					</div>
					<div className="illus md:w-1/2 h-full rounded-xl"></div>
				</div>
			</motion.div>
		</AnimatePresence>
	) : null;
};

export default AuthModal;
