import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { useNavigate, } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import InputField from "./InputField";
import Button from "./Button";
import { useAuth } from "@/context/userContext";
import toast from "react-hot-toast";
import { AiFillEdit } from "react-icons/ai";
import { profileAPI } from "@/api/endpoints/auth.endpoint";

interface ModalTypes {
	showModal: boolean;
}

const EditModal = ({ showModal }: ModalTypes) => {
	// const { pathname } = useLocation();
	const navigate = useNavigate();
	const modalRef = useRef(null);
	const [isLoading, setisLoading] = useState<boolean>(false);
	const [cred, setcred] = useState({
		bio: "",
		fullName: "",
	});
	const { User, findAndInitUser } = useAuth();



	async function handleSubmit(e: FormEvent<HTMLElement>) {
		e.preventDefault();
		setisLoading(true);

		const valid = cred.bio.length > 0;

		if (valid) {
			if (cred.bio.length < 5) {
				setisLoading(false);
				return toast.error("Bio length is too short!");
			}
		}

		const data = {
			email: User?.email,
			fullName: cred.fullName,
			bio: cred.bio,
		};

		const { error, serverResponse } = await profileAPI(data);

		console.log(serverResponse.message);

		if (!error) {
			findAndInitUser();
			setisLoading(false);

			return toast.success(serverResponse.message);
		}

		setisLoading(false);
	}

	function handleBackDropt(e: any) {
		if (showModal && modalRef.current == e.target) {
			navigate("/dashboard");
		}
	}

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
				exit={{ opacity: 0, x: 100 }}
				className="fixed top-0 left-0 bg-[#00000070] centered w-screen h-screen fadeIn"
				onClick={handleBackDropt}
				ref={modalRef}
			>
				<div className="card bg-white rounded-xl  md:w-[30%] h-[auto] flex w-[90%]">
					{/* AUTH BOX */}
					<div className="auth_box w-full p-8">
						<div className="w-full space-y-4">
							{/* head */}
							<div className="flex justify-start items-center space-x-3">
								<h1 className="title text-2xl text-abbey-pri font-semibold">Edit profile</h1>
								<AiFillEdit className="title text-2xl text-abbey-pri font-semibold" />
							</div>

							{/* auth form */}
							<form onSubmit={handleSubmit} className="form flex flex-col space-y-2 mt-4 w-full ">
								<InputField
									label={""}
									type={"text"}
									value={cred.fullName}
									filedName="fullName"
									change={handleFieldChange}
									place={"Fullname"}
								/>

								<InputField
									label={""}
									type={"text"}
									value={cred.bio}
									filedName="bio"
									change={handleFieldChange}
									place={"Bio"}
								/>

								<Button isLoading={isLoading} primary text={"Save changes"} type={undefined} />
							</form>
						</div>
					</div>
				</div>
			</motion.div>
		</AnimatePresence>
	) : null;
};

export default EditModal;
