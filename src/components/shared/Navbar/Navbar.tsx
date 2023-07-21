/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import Logo from "../../../assets/Logo/logo.jpg";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { getUser } from "../../../redux/features/users/usersSlice";

const Navbar = () => {
    const user = useAppSelector((state) => state.local.user.user);
    const dispatch = useAppDispatch();
    const handleLogOut = () => {
        dispatch(getUser(undefined));
        localStorage.removeItem("token");
    };
    return (
        <nav className=" py-4  border-gray-200 bg-gray-50">
            <div className="flex container flex-wrap items-center justify-between mx-auto">
                <Link to="/" className="flex items-center">
                    <img
                        src={Logo}
                        className="h-12 mr-3 rounded-full"
                        alt="kitab library"
                    />
                    <span className="self-center text-xl font-semibold whitespace-nowrap ">
                        Kitab-Library
                    </span>
                </Link>
                <button
                    type="button"
                    className="lg:hidden md:hidden inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
                    aria-controls="navbar-solid-bg"
                    aria-expanded="false"
                >
                    <span className="sr-only">Open main menu</span>
                    <svg
                        className="w-6 h-6"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                </button>
                <div className="">
                    <ul className="flex flex-col mt-4 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-transparent ">
                        <li>
                            <Link
                                to="/"
                                className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0"
                                aria-current="page"
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/all-books"
                                className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 "
                            >
                                All Books
                            </Link>
                        </li>
                        
                        {user?.email && (
                            <>
                                <li>
                                    <Link
                                        to="/add-book"
                                        className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 "
                                    >
                                        Add Book
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/user-wish-list"
                                        className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 "
                                    >
                                        Wish List
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/user-read-soon"
                                        className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 "
                                    >
                                       Read Soon
                                    </Link>
                                </li>
                                <li
                                    onClick={handleLogOut}
                                    className="py-2 pl-3 pr-4
                                    text-gray-700 rounded hover:bg-gray-100
                                    md:hover:bg-transparent md:border-0
                                    md:hover:text-blue-700 md:p-0 cursor-pointer flex items-center justify-center"
                                >
                                    <FiLogOut className="text-base" />
                                </li>
                            </>
                        )}
                        {!user?.email && (
                            <>
                                <li>
                                    <Link
                                        to="/login"
                                        className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 "
                                    >
                                        Sign In
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/register"
                                        className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 "
                                    >
                                        Sign Up
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
