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