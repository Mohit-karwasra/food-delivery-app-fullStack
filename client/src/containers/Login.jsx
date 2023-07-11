import React, { useState } from "react";
import { LoginBg, Logo } from "../assets";
import { LoginInput } from "../components";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { motion } from "framer-motion";
import { buttonClick } from "../animations";
import { FcGoogle } from "react-icons/fc";

import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "../config/firebase.config";
import { validateUserJWTToken } from "../api";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const [userEmail, setUserEmail] = useState("");
	const [isSignUp, setIsSignUp] = useState(false);
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const firebaseAuth = getAuth(app); // all firebase enabled auth data is referenced here
	const provider = new GoogleAuthProvider();

	const navigate = useNavigate();

	const loginWithGoogle = async () => {
		await signInWithPopup(firebaseAuth, provider) // returns promise
			.then((userCred) => {
				// handle user credentials
				firebaseAuth.onAuthStateChanged((creden) => {
					// to verify user credentials we need to send the access token to backend and verify it from there as to it updates every 1 hour.
					if (creden) {
						creden.getIdToken().then((token) => {
							validateUserJWTToken(token).then((data) => console.log(data));
							navigate("/", { replace: true });
						});
					}
				});
			});
	};

	const signUpWithEmailPass = async () => {
		if (userEmail === "" || password === "" || confirmPassword === "") {
			// alert message
		} else {
			if (password === confirmPassword) {
				setUserEmail("");
				setPassword("");
				setConfirmPassword("");
				await createUserWithEmailAndPassword(firebaseAuth, userEmail, password).then((userCred) => {
					// handle user credentials
					firebaseAuth.onAuthStateChanged((creden) => {
						// to verify user credentials we need to send the access token to backend and verify it from there as to it updates every 1 hour.
						if (creden) {
							creden.getIdToken().then((token) => {
								validateUserJWTToken(token).then((data) => {
									console.log(data);
								});
								navigate("/", { replace: true });
							});
						}
					});
				});
			} else {
				// alert message
			}
		}
	};

	const signInWithEmailPass = async () => {
		if (userEmail !== "" && password !== "") {
			await signInWithEmailAndPassword(firebaseAuth, userEmail, password).then((userCred) => {
				firebaseAuth.onAuthStateChanged((creden) => {
					// to verify user credentials we need to send the access token to backend and verify it from there as to it updates every 1 hour.
					if (creden) {
						creden.getIdToken().then((token) => {
							validateUserJWTToken(token).then((data) => {
								console.log(data);
							});
							navigate("/", { replace: true });
						});
					}
				});
			});
		} else {
			// alert message
		}
	};

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
				<p className=" text-xl text-gray-800 ">{isSignUp ? "Sign Up" : "Sign In"} here</p>

				<div className=" w-full flex flex-col items-center justify-center gap-6 px-4  md:px-12 py-4 ">
					<LoginInput
						placeholder={"Email here"}
						icon={<FaEnvelope className=" text-xl text-textColor" />}
						inputState={userEmail}
						inputStateFunction={setUserEmail}
						type="email"
						isSignUp={isSignUp}
					/>

					<LoginInput
						placeholder={"Password here"}
						icon={<FaLock className=" text-xl text-textColor" />}
						inputState={password}
						inputStateFunction={setPassword}
						type="password"
						isSignUp={isSignUp}
					/>

					{isSignUp && (
						<LoginInput
							placeholder={"Confirm password here"}
							icon={<FaLock className=" text-xl text-textColor" />}
							inputState={confirmPassword}
							inputStateFunction={setConfirmPassword}
							type="password"
							isSignUp={isSignUp}
						/>
					)}

					{!isSignUp ? (
						<p>
							Doesn't have an account{" "}
							<motion.button
								{...buttonClick}
								className=" text-red-700 underline cursor-pointer bg-transparent"
								onClick={() => setIsSignUp(true)}
							>
								Create one
							</motion.button>{" "}
						</p>
					) : (
						<p>
							Already have an account{" "}
							<motion.button
								{...buttonClick}
								className=" text-red-700 underline cursor-pointer bg-transparent"
								onClick={() => setIsSignUp(false)}
							>
								Sign-In here
							</motion.button>{" "}
						</p>
					)}

					{isSignUp ? (
						<motion.button
							{...buttonClick}
							className=" w-full px-4 py-2 rounded-md bg-red-500 cursor-pointer text-white text-xl capitalize hover:bg-red-600 transition-all duration-150"
							onClick={signUpWithEmailPass}
						>
							Sign Up
						</motion.button>
					) : (
						<motion.button
							{...buttonClick}
							className=" w-full px-4 py-2 rounded-md bg-red-500 cursor-pointer text-white text-xl capitalize hover:bg-red-600 transition-all duration-150"
							onClick={signInWithEmailPass}
						>
							Sign In
						</motion.button>
					)}
				</div>

				<div className="flex items-center justify-between gap-16">
					<div className=" w-24 h-[2px] rounded-md bg-white"></div>
					<p className="text-white">or</p>
					<div className=" w-24 h-[2px] rounded-md bg-white"></div>
				</div>

				<motion.div
					{...buttonClick}
					className="flex items-center justify-center px-20 py-2 bg-lightOverlay backdrop-blur-md cursor-pointer rounded-3xl gap-4 mt-4"
					onClick={loginWithGoogle}
				>
					<FcGoogle className="text-3xl" />
					<p className=" capitalize text-base text-headingColor">Signin with Google</p>
				</motion.div>
			</div>
		</div>
	);
};

export default Login;
