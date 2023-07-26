import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Avatar, Logo } from "../assets";
import { isActiveStyles, isNorActiveStyles } from "../utils/styles";
import { motion } from "framer-motion";
import { buttonClick, slideTop } from "../animations";
import { MdLogout, MdShoppingCart } from "../assets/icons";
import { useDispatch, useSelector } from "react-redux";
import { getAuth } from "firebase/auth";
import { app } from "../config/firebase.config";
import { setUserNull } from "../context/actions/userActions";
import { setCartOn } from "../context/actions/displayCartAction";
import { MdMenu } from "react-icons/md";

const Header = () => {
	const user = useSelector((state) => state.user);
	const cart = useSelector((state) => state.cart);

	const [isMenu, setIsMenu] = useState(false);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const firebaseAuth = getAuth(app);
	const signOut = () => {
		firebaseAuth
			.signOut()
			.then(() => {
				dispatch(setUserNull());
				navigate("/login", { replace: true });
			})
			.catch((err) => console.log(err));
	};

	// navbar for smaller screen
	const [showNavLinks, setShowNavLinks] = useState(false);
	const toggleNavLinks = () => {
		setShowNavLinks((prevShowNavLinks) => !prevShowNavLinks);
	};

	return (
		<header className="fixed backdrop-blur-lg z-50 inset-x-0 top-0 flex items-center justify-between px-12 md:px-20 py-6 ">
			{/* <NavLink to={"/"} className="flex items-center justify-center gap-4">
				<img src={Logo} alt="logo" className="w-12" />
				<p className=" font-semibold text-xl">Hanumangarh</p>
			</NavLink>
			<nav className=" flex items-center justify-center gap-8">
				<ul className=" hidden md:flex items-center justify-center gap-16">
					<NavLink
						className={({ isActive }) => (isActive ? isActiveStyles : isNorActiveStyles)}
						to={"/"}
					>
						Home
					</NavLink>
					<NavLink
						className={({ isActive }) => (isActive ? isActiveStyles : isNorActiveStyles)}
						to={"/menu"}
					>
						Menu
					</NavLink>
					<NavLink
						className={({ isActive }) => (isActive ? isActiveStyles : isNorActiveStyles)}
						to={"/services"}
					>
						Services
					</NavLink>
					<NavLink
						className={({ isActive }) => (isActive ? isActiveStyles : isNorActiveStyles)}
						to={"/aboutus"}
					>
						About Us
					</NavLink>
				</ul>

				
				<div className="md:hidden">
					<motion.button {...buttonClick} onClick={toggleNavLinks} className="p-2">
						<MdMenu className="text-2xl text-textColor" />
					</motion.button>
				</div>
				
				{showNavLinks && (
					<nav className=" md:hidden flex flex-col items-center mt-4">
						<NavLink
							className={({ isActive }) => (isActive ? isActiveStyles : isNorActiveStyles)}
							to={"/"}
						>
							Home
						</NavLink>
						<NavLink
							className={({ isActive }) => (isActive ? isActiveStyles : isNorActiveStyles)}
							to={"/menu"}
						>
							Menu
						</NavLink>
						<NavLink
							className={({ isActive }) => (isActive ? isActiveStyles : isNorActiveStyles)}
							to={"/services"}
						>
							Services
						</NavLink>
						<NavLink
							className={({ isActive }) => (isActive ? isActiveStyles : isNorActiveStyles)}
							to={"/aboutus"}
						>
							About Us
						</NavLink>
					</nav>
				)}
			</nav> */}

			{/* Hamburger menu icon (visible on smaller screens) */}
			<div className="md:hidden">
				<motion.button {...buttonClick} onClick={toggleNavLinks} className="p-2">
					<MdMenu className="text-2xl text-textColor" />
				</motion.button>
			</div>
			{/* Responsive nav links */}
			{showNavLinks && (
				<div className=" fixed top-20 left-4 backdrop-blur-lg rounded-lg">
					<nav className="md:hidden flex flex-col items-start mt-4 ">
						<NavLink
							className={({ isActive }) => (isActive ? isActiveStyles : isNorActiveStyles)}
							to={"/"}
						>
							Home
						</NavLink>
						<NavLink
							className={({ isActive }) => (isActive ? isActiveStyles : isNorActiveStyles)}
							to={"/menu"}
						>
							Menu
						</NavLink>
						<NavLink
							className={({ isActive }) => (isActive ? isActiveStyles : isNorActiveStyles)}
							to={"/services"}
						>
							Services
						</NavLink>
						<NavLink
							className={({ isActive }) => (isActive ? isActiveStyles : isNorActiveStyles)}
							to={"/aboutus"}
						>
							About Us
						</NavLink>
					</nav>
				</div>
			)}
			{/* Logo and title */}
			<NavLink to={"/"} className="flex items-center justify-center gap-4">
				<img src={Logo} alt="logo" className="w-12" />
				<p className="font-semibold text-xl lg:text-3xl">Hanumangarh</p>
			</NavLink>

			{/* Nav links for larger screens */}
			<nav className="hidden md:flex items-center justify-center gap-8 flex-grow ">
				<ul className="items-center justify-center gap-16 ">
					<NavLink
						className={({ isActive }) => (isActive ? isActiveStyles : isNorActiveStyles)}
						to={"/"}
					>
						<span className="font-semibold text-xl lg:text-3xl">Home</span>
					</NavLink>
					<NavLink
						className={({ isActive }) => (isActive ? isActiveStyles : isNorActiveStyles)}
						to={"/menu"}
					>
						<span className="font-semibold text-xl lg:text-3xl">Menu</span>
					</NavLink>
					<NavLink
						className={({ isActive }) => (isActive ? isActiveStyles : isNorActiveStyles)}
						to={"/services"}
					>
						<span className="font-semibold text-xl lg:text-3xl">Services</span>
					</NavLink>
					<NavLink
						className={({ isActive }) => (isActive ? isActiveStyles : isNorActiveStyles)}
						to={"/aboutus"}
					>
						<span className="font-semibold text-xl lg:text-3xl">About Us</span>
					</NavLink>
				</ul>
			</nav>

			<nav className="flex items-center justify-center gap-8">
				<motion.div
					{...buttonClick}
					onClick={() => dispatch(setCartOn())}
					className="relative cursor-pointer"
				>
					<MdShoppingCart className=" text-3xl text-textColor" />
					{cart?.length > 0 && (
						<div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center absolute -top-4 -right-1">
							<p className=" text-primary text-base font-semibold">{cart?.length}</p>
						</div>
					)}
				</motion.div>

				{user ? (
					<>
						<div className=" relative cursor-pointer" onMouseEnter={() => setIsMenu(true)}>
							<div className="w-12 h-12 rounded-full shadow-md cursor-pointer overflow-hidden flex items-center justify-center">
								<motion.img
									className=" w-full h-full object-cover"
									src={user?.picture ? user?.picture : Avatar}
									whileHover={{ scale: 1.15 }}
									referrerPolicy="no-referrer"
								/>
							</div>

							{isMenu && (
								<motion.div
									{...slideTop}
									onMouseLeave={() => setIsMenu(false)}
									className=" px-6 py-4 w-48 bg-lightOverlay backdrop-blur-md rounded-md shadow-md absolute top-12 right-0 flex flex-col gap-4"
								>
									{/* {user?.user_id === process.env.REACT_APP_ADMIN_ID && ( */}
									<Link
										className=" hover:text-red-500 text-xl text-textColor"
										to={"/dashboard/home"}
									>
										Dashboard
									</Link>
									{/* )} */}

									<Link className=" hover:text-red-500 text-xl text-textColor" to={"/profile"}>
										My Profile
									</Link>
									<Link className=" hover:text-red-500 text-xl text-textColor" to={"/user-orders"}>
										Orders
									</Link>
									<hr />

									<motion.div
										{...buttonClick}
										onClick={signOut}
										className="group flex items-center justify-center px-3 py-2 rounded-md shadow-md bg-gray-100 hover:bg-gray-200 gap-3"
									>
										<MdLogout className=" text-2xl text-textColor group-hover::text-headingColor" />
										<p className=" text-textColor text-lg group-hover::text-headingColor">
											Sign Out
										</p>
									</motion.div>
								</motion.div>
							)}
						</div>
					</>
				) : (
					<>
						<NavLink to={"/login"}>
							<motion.button
								{...buttonClick}
								className=" px-4 py-2 rounded-md bg-lightOverlay border border-red-300 cursor-pointer"
							>
								Login
							</motion.button>
						</NavLink>
					</>
				)}
			</nav>
		</header>
	);
};

export default Header;
