export type ResponsTypes = Promise<{
	error: boolean;
	serverResponse: {
		[key: string]: any;
	};
}>;

export type ShortLinkDataTypes = {
      visitors?: number;
      shortLink: string | undefined;
}

export interface AuthTypes
	{ email: string; password: string; username: string }

	export interface AuthTypesLogin {
		email: string;
		password: string;
		username: string;
	}
