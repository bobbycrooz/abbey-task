// import { LoginUserType, UserTypes } from "@types";
import { ResponsTypes } from "@/Types/endpoints";
import service from "../index";

export function creatLinkAPI(link: string): ResponsTypes {
	// console.log('look i got here');
	return service({
		url: "/url/create",
		method: "post",
		data: {
			longLink: link,
		},
	});
}

