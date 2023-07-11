import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Login, Main } from "./containers";
import { getAuth } from "firebase/auth";
import { app } from "./config/firebase.config";
import { useDispatch } from "react-redux";
import { validateUserJWTToken } from "./api";
import { setUserDetails } from "./context/actions/userActions";
import { motion } from "framer-motion";
import { fadeInOut } from "./animations";
const App = () => {
	const firebaseAuth = getAuth(app);
	const [isLoading, setIsLoading] = useState(false);

	const dispatch = useDispatch();

	useEffect(() => {
		setIsLoading(true);
		firebaseAuth.onAuthStateChanged((creden) => {
			// to verify user credentials we need to send the access token to backend and verify it from there as to it updates every 1 hour.
			if (creden) {
				creden.getIdToken().then((token) => {
					validateUserJWTToken(token).then((data) => {
						dispatch(setUserDetails(data));
					});
				});
			}
			setTimeout(() => {
				setIsLoading(false);
			}, 3000);
		});
	}, []);

	return (
		<div className="  w-screen min-h-screen h-auto flex flex-col items-center justify-center  ">
			{isLoading && (
				<motion.div
					{...fadeInOut}
					className="fixed z-50 inset-0 bg-lightOverlay backdrop-blur-md flex items-center justify-center w-full"
				>
					Loading....
				</motion.div>
			)}
			<Routes>
				<Route path="/*" element={<Main />} />
				<Route path="/login" element={<Login />} />
			</Routes>
		</div>
	);
};

export default App;
