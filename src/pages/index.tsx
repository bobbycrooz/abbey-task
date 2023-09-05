import { ShortLinkDataTypes } from "@/Types/endpoints";
import { creatLinkAPI } from "@/api/endpoints/url.endpoint.ts";
import React, { useEffect, useState } from "react";

const Home: React.FC = () => {
	const [longLink, setLongLink] = useState<string>("");
	// const [shortLink, setShortLink] = useState<string>("");
	const [shortLinkData, setShortLinkData] = useState<ShortLinkDataTypes>();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [Coppied, setCoppied] = useState<boolean>(false);

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
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
		<div className="home w-screen h-screen relative px-[58px] py-[53px]">
 			{/* LOGO */}
			{Coppied && <div className="bg-green-200 w-auto rounded-xl p-4 px-4 centered absolute left-1/2 top-[10%]  -translate-x-1/2">
					<p className="text-green-700 text-lg font-g-medium">
						Coppied to clipboard !
					</p>
				</div>}

			{/* LOGO */}
			<div className="brand-logo">
				<img src="/brand-logo.svg" alt="brand logo" className="w-[100px] h-[53px]" />
			</div>

			{/* TOP RIGHT SVG */}
			<div className="absolute top-0 right-0 z-40">
				<img src="/tr.png" alt="" className="w-[700px] h-[600px] ani" />
				<img src="/hero-left.svg" alt="" className="w-[700px] h-[600px] absolute top-[25%] right-20" />
			</div>

			{/* GRADIENT */}
			<img
				src="/grad.svg"
				alt=""
				className="w-[327px] h-[191px] absolute bottom-[130px] right-[60px] animate-soft-rotate anima"
			/>

			{/* HERO CONTENT */}
			<div className="hero_content mt-[24px] relative ">
				<h1 className="hero_title text-pri text-4xl font-g-bold ">URL Address shortener</h1>
				<h3 className="hero_subtitle text-[#1c0832d2] text-[28px] w-[589px] font-g-bold mt-1 z-20">
					Convert long URL and Address link into a short one, and share with friends.
				</h3>
				<p className="hero_paragraph w-[501px] text-text-fade font-g-medium mt-[30px]">
					We don’t need the long boring link address, makes the address bar and where it’s share look so messy
				</p>

				{/* GRADIENT */}
				<img src="/grad.svg" alt="" className="w-[327px] h-[191px] absolute -top-[10px] -left-[10px]nz-10" />
			</div>

			{/* FORM CENTER */}
			<div className="url_form w-[647px] mt-[86px]">
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
							className={`btn   bg-[#9B48F5] rounded-[14px] font-g-medium text-white text-lg
						 px-[39px]  disabled:bg-text-fade disabled:text-gray-300 p-2 absolute right-0 -top-[2px] flex items-center  hover:top-[2px] transition-all ${
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
				</div>

				{/* COPY */}
				<div className="paste flex mt-8">
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
							className={`btn bg-[#9B48F5] rounded-[14px] font-g-medium text-white text-lg px-[39px] p-2 absolute right-0 -top-[2px] flex items-center justify-center  hover:top-[2px] transition-all ${shortLinkData?.shortLink === undefined && "disabled:bg-text-fade disabled:text-gray-300 cursor-not-allowed"}`}
						>
							<p>Copy</p>
						</button>
					</div>
				</div>

				

				<div className="copied w-full flex justify-end">
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

function ShareSVG() {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="19" height="17" viewBox="0 0 19 17" fill="none">
			<path
				d="M10.242 13.2939C10.3477 13.3868 10.4316 13.4972 10.4888 13.6187C10.546 13.7402 10.5755 13.8705 10.5755 14.0021C10.5755 14.1337 10.546 14.264 10.4888 14.3856C10.4316 14.5071 10.3477 14.6175 10.242 14.7104L9.68077 15.2053C8.61728 16.1431 7.17487 16.67 5.67087 16.67C4.16686 16.67 2.72445 16.1431 1.66096 15.2053C0.597465 14.2674 0 12.9954 0 11.6691C0 10.3428 0.597465 9.07082 1.66096 8.13298L3.93992 6.1241C4.96175 5.22077 6.33658 4.69617 7.7828 4.65775C9.22902 4.61933 10.6372 5.07001 11.7188 5.91747C11.8305 6.005 11.9215 6.11108 11.9867 6.22964C12.0519 6.34819 12.0899 6.47691 12.0987 6.60844C12.1075 6.73997 12.0868 6.87174 12.0378 6.99622C11.9888 7.1207 11.9125 7.23545 11.8133 7.33393C11.714 7.43241 11.5937 7.51268 11.4593 7.57016C11.3249 7.62764 11.1789 7.66121 11.0297 7.66895C10.8806 7.67668 10.7312 7.65844 10.59 7.61525C10.4488 7.57207 10.3187 7.50478 10.2071 7.41725C9.55843 6.90926 8.71423 6.63901 7.84713 6.66178C6.98003 6.68455 6.15556 6.99861 5.54237 7.53973L3.2653 9.54611C2.6273 10.1087 2.26888 10.8718 2.26888 11.6675C2.26888 12.4631 2.6273 13.2262 3.2653 13.7888C3.9033 14.3514 4.7686 14.6675 5.67087 14.6675C6.57313 14.6675 7.43844 14.3514 8.07643 13.7888L8.63767 13.2939C8.74297 13.2009 8.86801 13.1272 9.00566 13.0769C9.1433 13.0265 9.29084 13.0006 9.43984 13.0006C9.58884 13.0006 9.73638 13.0265 9.87402 13.0769C10.0117 13.1272 10.1367 13.2009 10.242 13.2939ZM17.2414 1.46228C16.177 0.525881 14.735 0 13.2315 0C11.728 0 10.2859 0.525881 9.22158 1.46228L8.66035 1.95721C8.44735 2.14505 8.32768 2.3998 8.32768 2.66544C8.32768 2.93108 8.44735 3.18584 8.66035 3.37367C8.87334 3.56151 9.16223 3.66703 9.46346 3.66703C9.76469 3.66703 10.0536 3.56151 10.2666 3.37367L10.8278 2.87874C11.4658 2.31613 12.3311 2.00005 13.2334 2.00005C14.1356 2.00005 15.0009 2.31613 15.6389 2.87874C16.2769 3.44136 16.6354 4.20444 16.6354 5.0001C16.6354 5.79577 16.2769 6.55884 15.6389 7.12146L13.3609 9.13117C12.7472 9.67206 11.9223 9.98567 11.0549 10.0078C10.1876 10.03 9.3435 9.75898 8.6953 9.25032C8.58363 9.16278 8.4535 9.0955 8.31235 9.05231C8.17119 9.00913 8.02177 8.99088 7.87262 8.99862C7.72347 9.00636 7.5775 9.03992 7.44306 9.09741C7.30862 9.15489 7.18834 9.23516 7.08907 9.33364C6.98981 9.43211 6.91352 9.54687 6.86454 9.67135C6.81557 9.79583 6.79488 9.92759 6.80365 10.0591C6.81243 10.1907 6.85049 10.3194 6.91568 10.4379C6.98086 10.5565 7.07189 10.6626 7.18356 10.7501C8.26444 11.5974 9.67164 12.0483 11.1172 12.0107C12.5627 11.973 13.9373 11.4497 14.9596 10.5476L17.2386 8.53875C18.3017 7.60037 18.8991 6.32832 18.8996 5.00187C18.9001 3.67542 18.3037 2.40299 17.2414 1.46395V1.46228Z"
				fill="#828184"
			/>
		</svg>
	);
}

function PasteSVG() {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
			<path
				d="M19.53 8.33333L14 2.57292C13.8595 2.42636 13.6688 2.34393 13.47 2.34375H11C10.2707 2.34375 9.57118 2.64555 9.05546 3.18277C8.53973 3.71998 8.25 4.4486 8.25 5.20833V6.51042H7C6.27065 6.51042 5.57118 6.81222 5.05546 7.34943C4.53973 7.88665 4.25 8.61526 4.25 9.375V19.7917C4.25 20.5514 4.53973 21.28 5.05546 21.8172C5.57118 22.3544 6.27065 22.6562 7 22.6562H14C14.7293 22.6562 15.4288 22.3544 15.9445 21.8172C16.4603 21.28 16.75 20.5514 16.75 19.7917V18.4896H17C17.7293 18.4896 18.4288 18.1878 18.9445 17.6506C19.4603 17.1134 19.75 16.3847 19.75 15.625V8.85417C19.7421 8.65792 19.6636 8.47196 19.53 8.33333ZM14.25 5.01042L17.19 8.07292H14.25V5.01042ZM15.25 19.7917C15.25 20.137 15.1183 20.4682 14.8839 20.7124C14.6495 20.9566 14.3315 21.0938 14 21.0938H7C6.66848 21.0938 6.35054 20.9566 6.11612 20.7124C5.8817 20.4682 5.75 20.137 5.75 19.7917V9.375C5.75 9.02967 5.8817 8.69848 6.11612 8.45429C6.35054 8.2101 6.66848 8.07292 7 8.07292H8.25V15.625C8.25 16.3847 8.53973 17.1134 9.05546 17.6506C9.57118 18.1878 10.2707 18.4896 11 18.4896H15.25V19.7917ZM17 16.9271H11C10.6685 16.9271 10.3505 16.7899 10.1161 16.5457C9.8817 16.3015 9.75 15.9703 9.75 15.625V5.20833C9.75 4.863 9.8817 4.53181 10.1161 4.28762C10.3505 4.04343 10.6685 3.90625 11 3.90625H12.75V8.85417C12.7526 9.06053 12.8324 9.25768 12.9725 9.40361C13.1126 9.54954 13.3019 9.63272 13.5 9.63542H18.25V15.625C18.25 15.9703 18.1183 16.3015 17.8839 16.5457C17.6495 16.7899 17.3315 16.9271 17 16.9271Z"
				fill="#828184"
			/>
		</svg>
	);
}

export default Home;
