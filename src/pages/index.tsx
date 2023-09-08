import { ShortLinkDataTypes } from "@/Types/endpoints";
import { creatLinkAPI } from "@/api/endpoints/url.endpoint.ts";
import { PasteSVG, ShareSVG } from "@/assets";
import React, { useEffect, useState } from "react";

const Home: React.FC = () => {
	const [longLink, setLongLink] = useState<string>("");
	// const [shortLink, setShortLink] = useState<string>("");
	const [shortLinkData, setShortLinkData] = useState<ShortLinkDataTypes>();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [Coppied, setCoppied] = useState<boolean>(false);

	async function handleSubmit(e: any) {
		e.preventDefault();
		setIsLoading(true);

		if (longLink !== "") {
			const { error, serverResponse } = await creatLinkAPI(longLink);

			if (!error) {
				setShortLinkData({
					shortLink: serverResponse?.shortLink,
					visitors: serverResponse?.visitors,
				});
				setIsLoading(false);
			}

			console.log(error);
			setIsLoading(false);
		}
	}

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		e.preventDefault();
		setLongLink(e.target.value);
	}

	function handleCopy(e: React.ChangeEvent<HTMLInputElement>) {
		e.preventDefault();
	}

	useEffect(() =>
	{
		if (Coppied === true) {
			setTimeout(() => {
				setCoppied(false);
			}, 2000);
		}
	}, [Coppied]);


	return (
		<div className="home w-screen h-auto md:h-screen relative p-4 md:px-[58px] md:py-[53px]">
		{/* LOGO */}
			{Coppied && <div className="bg-green-200 z-[9999]  w-auto rounded-xl p-4 px-4 centered absolute left-1/2 top-[10%]  -translate-x-1/2">
					<p className="text-green-700 text-sm md:text-lg font-g-medium ">
						Coppied to clipboard !
					</p>
				</div>}

			{/* LOGO */}
			<div className="brand-logo sticky top-0 md:static h-11 md:auto">
				<img src="/brand-logo.svg" alt="brand logo" className="w-[100px] h-[53px]" />
			</div>

			{/* TOP RIGHT SVG */}
			<div className="absolute top-0 right-0 z-40 hidden md:flex">
				<img src="/tr.png" alt="" className="w-[700px] h-[600px] ani" />
				<img src="/hero-left.svg" alt="" className="w-[700px] h-[600px] absolute top-[25%] right-20" />
			</div>

			{/* GRADIENT */}
			<img
				src="/grad.svg"
				alt=""
				className="w-[327px] h-[191px] hidden  md:flex absolute md:bottom-[130px] md:right-[60px] animate-soft-rotate "
			/>

			{/* HERO CONTENT */}
			<div className="hero_content mt-[24px] relative z-[20] flex flex-col text-center md:text-left">
				<h1 className="hero_title text-pri text-3xl md:text-4xl font-g-bold ">URL Address shortener</h1>
				<h3 className="hero_subtitle text-[#1c0832d2] text-[18px] md:text-[28px]  md:w-[589px] w-auto font-g-bold mt-1">
					Convert long URL and Address link into a short one, and share with friends.
				</h3>
				<p className="hero_paragraph w-auto md:w-[501px] text-text-fade font-g-medium mt-[30px] text-sm">
					We don’t need the long boring link address, makes the address bar and where it’s share look so messy
				</p>

				{/* GRADIENT */}
			</div>
				<img src="/grad.svg" alt="" className="w-[327px] h-[191px] absolute top-[60px] left-[10px] z-10" />

			{/* FORM CENTER */}
			<div className="url_form w-full md:w-[647px] mt-[86px]">
				<div className="paste">
					<label htmlFor="url" className="text-[#1c0832d2] text-xl font-g-medium">
						Paste your long Url here.
					</label>
					<form
						onSubmit={handleSubmit}
						className="url-input-box border-2 border-[#9B48F5] w-full h-12 rounded-xl relative mt-4"
					>
						<div className="share_icon absolute left-5 top-4">
							<ShareSVG />
						</div>

						<input
							type="text"
							name="url"
							id="url"
							value={longLink}
							onChange={handleChange}
							placeholder="https://example.com"
							className="w-full bg-transparent absolute top-0 left-0 h-full pl-14  focus:outline-none"
						/>

						<button
							// onClick={ha}
							disabled={isLoading}
							className={`btn hidden  bg-[#9B48F5] rounded-[14px] font-g-medium text-white text-lg
						 px-[39px]  disabled:bg-text-fade disabled:text-gray-300 p-2 absolute right-0 -top-[2px] md:flex items-center  hover:top-[2px] transition-all ${
								isLoading ? "cursor-wait space-x-4" : "justify-center"
							}`}
						>
							{isLoading && (
								<div className="loader-body">
									<div className="loader-body-roller"></div>
								</div>
							)}
							<p>Shorten</p>
						</button>
					</form>

					{/* MOBILE -BUTTON */}
						<button
							onClick={handleSubmit}
							disabled={isLoading}
							className={`btn flex  bg-[#9B48F5] rounded-[14px] font-g-medium text-white text-lg
						 px-[39px]  disabled:bg-text-fade disabled:text-gray-300 p-2 mt-3 md:hidden items-center  hover:top-[2px] transition-all ${
								isLoading ? "cursor-wait space-x-4" : "justify-center"
							}`}
						>
							{isLoading && (
								<div className="loader-body">
									<div className="loader-body-roller"></div>
								</div>
							)}
							<p>Shorten</p>
						</button>
				</div>

				{/* COPY */}
				<div className="paste flex mt-8 flex-col md:flex-row justify-start space-y-3">
					<label htmlFor="url" className="text-[#1c0832d2] text-xl font-g-medium w-[208px]  ver-cent">
						Your short URL :
					</label>


					<div className="url-input-box border-2 border-[#9B48F5] w-full h-12 rounded-xl relative">
						<div className="share_icon absolute left-5 top-2">
							<PasteSVG />
						</div>

						<input
							type="text"
							name="url"
							id="generated-link"
							readOnly={true}
							onChange={handleCopy}
							value={shortLinkData?.shortLink}
							placeholder="Generated link"
							className="w-full bg-transparent absolute top-0 left-0 h-full pl-14  focus:outline-none"
						/>

						<button
							disabled={shortLinkData?.shortLink === undefined}
							onClick={() => {
								if (shortLinkData?.shortLink !== undefined) navigator.clipboard.writeText(shortLinkData?.shortLink);
								setCoppied(true);
								setShortLinkData({
									...shortLinkData,
									shortLink: undefined
								})
							

							}}
							className={`btn bg-[#9B48F5] rounded-[14px] hidden font-g-medium text-white text-lg px-[39px] p-2 absolute right-0 -top-[2px] md:flex items-center justify-center  hover:top-[2px] transition-all ${shortLinkData?.shortLink === undefined && "disabled:bg-text-fade disabled:text-gray-300 cursor-not-allowed"}`}
						>
							<p>Copy</p>
						</button>
					</div>

					<button
							disabled={shortLinkData?.shortLink === undefined}
							onClick={() => {
								if (shortLinkData?.shortLink !== undefined) navigator.clipboard.writeText(shortLinkData?.shortLink);
								setCoppied(true);
								setShortLinkData({
									...shortLinkData,
									shortLink: undefined
								})
							

							}}
							className={`btn bg-[#9B48F5] rounded-[14px] flex font-g-medium text-white text-lg px-[39px] p-2  md:hidden items-center justify-center  hover:top-[2px] transition-all ${shortLinkData?.shortLink === undefined && "disabled:bg-text-fade disabled:text-gray-300 cursor-not-allowed"}`}
						>
							<p>Copy</p>
						</button>
				</div>

				

				<div className="copied w-full flex justify-start md:justify-end">
					<p className="text-text-fade font-g-medium mt-4">
						visitors: {shortLinkData?.visitors} 
					</p>
				</div>
			</div>

			{/* COPY RIGHT */}
			<h1 className="text-text-fade font-g-medium mt-[5%]">digitalize - Short Urls</h1>
		</div>
	);
};


export default Home;
