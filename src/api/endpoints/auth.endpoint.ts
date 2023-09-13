// import { LoginUserType, UserTypes } from "@types";
import { AuthTypes, AuthTypesLogin, ResponsTypes } from "@/Types/endpoints";
import service from "../index";

export function logInAPI(data: AuthTypesLogin): ResponsTypes {
	// console.log('look i got here');
	return service({
		url: "/user/login",
		method: "post",
		data,
	});
}


export function RegisterAPI(data: AuthTypes): ResponsTypes {
	// console.log('look i got here');
	return service({
		url: "/user",
		method: "post",
		data,
	});
}

export function getUser(id?: string): ResponsTypes {
	// console.log('look i got here');
	return service({
		url: id ? `/user?id=${id}` : '/user',
		method: "get",
		
	});
}


export function connectAPI(data: any): ResponsTypes {
	// console.log('look i got here');
	return service({
		url: "/user/connect",
		method: "post",
		data
	});
}


export function profileAPI(data: any): ResponsTypes {
	// console.log('look i got here');
	return service({
		url: "/user",
		method: "patch",
		data,
	});
}

