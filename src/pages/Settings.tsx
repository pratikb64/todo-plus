import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { LoadingModal, Navbar } from "../components";
import CONSTANTS from "../configs/Constants";

const Settings = () => {
	const [formInputs, setFormInputs] = useState({
		first_name: "",
		last_name: "",
		email: "",
		api_key: "",
	});
	const [eyeState, setEyeState] = useState(false);
	const api_key_Ref = useRef<HTMLInputElement>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		axios({
			url: CONSTANTS.BASE_URL + "/v1/user",
			method: "GET",
			withCredentials: true,
		})
			.then((d) => {
				setFormInputs({
					first_name: d.data["first_name"],
					last_name: d.data["last_name"],
					email: d.data["email"],
					api_key: d.data["api_key"],
				});
				setIsLoading(false);
			})
			.catch((er) => setIsLoading(false));
	}, []);

	const togglePasswordVisibility = () => {
		setEyeState(!eyeState);
		if (!eyeState) api_key_Ref.current?.setAttribute("type", "text");
		else api_key_Ref.current?.setAttribute("type", "password");
	};

	const generateApiKey = () => {
		const loader = toast.loading('Generating api key!')
		axios({
			url: CONSTANTS.BASE_URL + "/v1/user/api-key",
			method: "GET",
			withCredentials: true,
		})
			.then((d) => {
				setFormInputs({
					...formInputs,
					api_key: d.data["api_key"],
				});
				toast.success('Successfully generated api key!', { id: loader })
			})
			.catch(er => toast.error(er.message, { id: loader }));
	};

	const deleteApiKey = () => {
		const loader = toast.loading('Deleting api key!')
		axios({
			url: CONSTANTS.BASE_URL + "/v1/user/api-key",
			method: "DELETE",
			withCredentials: true,
		})
			.then((d) => {
				setFormInputs({
					...formInputs,
					api_key: null,
				});
				toast.success('Api key deleted!', { id: loader })
			})
			.catch(er => toast.error(er.message, { id: loader }));
	};

	return (
		<div className="m-auto max-w-[90vw] xl:max-w-7xl">
			<Navbar />
			{isLoading && <LoadingModal />}
			<div>
				<div className="max-w-3xl m-auto mt-5 sm:mt-16">
					<div className="flex flex-col mb-4 sm:flex-row">
						<div className="min-w-[33.33%] mb-6 sm:mb-0">
							<span className="text-xl font-semibold">Account</span>
							<br />
							<span className="text-xs font-semibold text-gray-500 whitespace-nowrap">
								Customize account settings.
							</span>
						</div>

						<div className="w-full">
							<div className="flex flex-col mb-6 md:flex-row">
								<div className="flex flex-col w-full mb-6 md:mr-6 md:mb-0">
									<span className="mb-2 text-sm font-semibold">First name</span>
									<input
										defaultValue={formInputs.first_name}
										className="p-1 pl-2 bg-[#13151a] border border-gray-600/50 rounded-md"
										type="text"
										name="first_name"
										id="first_name"
									/>
								</div>
								<div className="flex flex-col w-full">
									<span className="mb-2 text-sm font-semibold">Last name</span>
									<input
										defaultValue={formInputs.last_name}
										className="p-1 pl-2 bg-[#13151a] border border-gray-600/50 rounded-md"
										type="text"
										name="last_name"
										id="last_name"
									/>
								</div>
							</div>
							<div>
								<div className="flex flex-col mb-6">
									<span className="mb-2 text-sm font-semibold">
										Email address
									</span>
									<input
										defaultValue={formInputs.email}
										className="p-1 pl-2 bg-[#13151a] border border-gray-600/50 rounded-md"
										type="text"
										name="email"
										id="email"
									/>
								</div>
							</div>
							{/* <div>
								<div className='flex flex-col mb-6'>
									<span className='mb-2 text-sm font-semibold'>
										Password
									</span>
									<input className='p-1 pl-2 bg-[#13151a] border border-gray-600/50 rounded-md' type="text" name="password" id="password" />
								</div>
							</div> */}
							<div></div>
						</div>
					</div>

					<hr className="border-gray-800" />
					<div className="flex flex-col mt-6 mb-4 sm:flex-row ">
						<div className="min-w-[33.33%] mb-6 sm:mb-0">
							<span className="text-xl font-semibold">Api keys</span>
							<br />
							<span className="text-xs font-semibold text-gray-500 whitespace-nowrap">
								Manage your API keys.
							</span>
						</div>
						<div className="flex flex-col w-full mb-6">
							<span className="mb-2 text-sm font-semibold">API key</span>
							<div className="relative w-full">
								{formInputs.api_key ? (
									<>
										<input
											defaultValue={formInputs.api_key}
											ref={api_key_Ref}
											className="p-2 bg-[#13151a] w-full border mb-3 border-gray-600/50 rounded-md mr-4 text-sm text-gray-300"
											type="password"
											name="api_key"
											id="api_key"
											disabled
										/>
										<div className="flex w-full sm:block">
											<button onClick={() => {
												navigator.clipboard.writeText(formInputs.api_key).then(() => {
													toast.success('Copied to clipboard')
												})
											}} className="w-full px-4 py-2 mr-3 text-sm bg-blue-600 rounded-lg sm:w-auto hover:bg-blue-700 active:bg-blue-800">
												Copy
											</button>
											<button onClick={() => deleteApiKey()} className="w-full px-4 py-2 text-sm bg-red-600 rounded-lg sm:w-auto hover:bg-red-700 active:bg-red-800">
												Delete key
											</button>
										</div>
										<div
											onClick={() => togglePasswordVisibility()}
											className="absolute cursor-pointer top-2 right-3"
										>
											{eyeState ? (
												<EyeIcon className="w-5" />
											) : (
												<EyeOffIcon className="w-5" />
											)}
										</div>
									</>
								) : (
									<button onClick={() => generateApiKey()} className="p-2 px-4 bg-[#2bad27] text-sm hover:bg-[#2bad27de] active:bg-[#2bad27b6] rounded-lg">
										Generate key
									</button>
								)}
							</div>
						</div>
					</div>
					<hr className="border-gray-800" />

					<div className="flex flex-col mt-6 mb-4 sm:flex-row">
						<div className="min-w-[33.33%]">
							<span className="text-xl font-semibold">Delete account</span>
							<br />
							<span className="text-xs font-semibold text-gray-500 whitespace-nowrap">
								Delete your account permanently.
							</span>
						</div>

						<div>
							<div className="flex flex-col mt-6 mb-6 sm:mt-0 ">
								<span className="mb-2 text-sm font-semibold">
									Are you sure about this?
								</span>
								<div>
									<button className="px-4 py-2 text-sm bg-red-600 rounded-lg hover:bg-red-700 active:bg-red-800">
										Yes, delete my account
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Settings;
