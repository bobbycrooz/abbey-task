import { AuthTypesLogin } from "@/Types/endpoints";
import { RegisterAPI, getUser, logInAPI } from "@/api/endpoints/auth.endpoint";
import { useContext, useState, createContext, useEffect } from "react";
import toast from "react-hot-toast";

// import utils from 'utils';

const AuthContext = createContext<any>({});

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
	return useContext(AuthContext);
};

// ------User Reduceer

// -------------------------------------------------------

const AuthProvider = ({ children }: { children: any }) => {
	const [AllUsers, setAllUsers] = useState([]);
	// const [User, dispatch] = useReducer(userReducer, initialState);
	const [User, setUser] = useState({
		email: "",
		phone: "",
	});

	// handlers------------------

	// --Auth handler
	const authService = {
		logIn: async (credentials: AuthTypesLogin) => {
			try {
				// console.log(credentials);

				// send otp to the user number
				const { error, serverResponse } = await logInAPI(credentials);

				console.log(error, serverResponse);

				if (error == false) {
					// save token to cookie

					localStorage.setItem("abbey_user", JSON.stringify(serverResponse.user._id));

					setUser({
						...User,
						...serverResponse.user,
					});

					// save otpId
					toast.success(serverResponse.message as string);
					return true;
				} else {
					toast.error(serverResponse.message as string);

					return false;
				}
			} catch (error) {
				console.log(error);
			}
		},

		// verify otp handler
		register: async (cred: any) => {
			try {
				const { error, serverResponse } = await RegisterAPI(cred);

				// console.log(error, serverResponse);

				if (error == false) {
					// save token to cookie

					localStorage.setItem("abbey_user", JSON.stringify(serverResponse.user._id));

					setUser({
						...User,
						...serverResponse.user,
					});

					// save otpId
					toast.success(serverResponse.message as string);

					return true;
				} else {
					toast.error(serverResponse.message as string);

					return false;
				}
			} catch (error: any) {
				console.log(error.message);
			}
		},
	};

	async function findAndInitUser() {
		const authUser = JSON.parse(localStorage.getItem("abbey_user") as string);
		const { error, serverResponse } = await getUser(authUser);



		if (error == false) {
			// save token to cookie
			setUser({
				...User,
				...serverResponse.user[0],
			});
		}
	}

      async function getAllUser()
      {
			setAllUsers([]);
            
		const { error, serverResponse } = await getUser();

            

		if (error == false) {
			// save token to cookie
			setAllUsers(serverResponse.user);

			// save otpId
			return true;
		}
	}

	// --------USEEFFECTS

	useEffect(() => {
		findAndInitUser();
		getAllUser();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// --------USEEFFECTS

	//providing the authcontext data to the consumer component
	return (
		<AuthContext.Provider value={{ User, authService, setUser, AllUsers, getAllUser, findAndInitUser }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
