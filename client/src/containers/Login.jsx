import React from "react";
import { LoginBg, Logo } from "../assets";

const Login = () => {
	return (
		<div className=" w-screen h-screen relative overflow-hidden flex  ">
			<img
				className=" w-full h-full object-cover absolute top-0 left-0  "
				src={LoginBg}
				alt="Indian food background"
			/>

			{/* login content box  */}
			<div className=" flex flex-col items-center bg-lightOverlay w-[80%] md:w-508 z-10 backdrop-blur-sm p-4 px-8 py-8 ">
				{/* logo and heading for login  */}
				<div className=" flex items-center justify-start gap-5 w-full  ">
					<img src={Logo} className=" w-8 " alt="" />
					<p className=" text-headingColor font-semibold text-2xl ">Hanumangarh</p>
				</div>

				<p className=" text-3xl font-semibold text-headingColor mt-4 ">Welcome</p>
				<p className=" text-xl text-gray-800 ">Sign In here</p>

				<div className=" w-full flex flex-col items-center justify-center gap-6 px-4  md:px-12 py-4 ">
					Here is input
				</div>
			</div>
		</div>
	);
};

export default Login;
