import { Link } from "react-router-dom";
import { useAppDispatch } from "../../redux/hook";
import { getUser } from "../../redux/features/users/usersSlice";


const NotFound = () => {
    const dispatch = useAppDispatch();
    const handleLogOut = () => {
        dispatch(getUser(undefined));
        localStorage.removeItem("token");
    };

    return (
        <>
            <section className="w-full h-screen flex flex-col justify-center">
                <div className="text-center">
                    <h2 className="text-red-400 text-8xl mb-8">
                        Not Found
                    </h2>

                    <p className="text-success">
                        Please{" "}
                        <button
                            className="text-white bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600 hover:bg-gradient-to-br focus:ring-0 focus:outline-none focus:ring-blue-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                            onClick={handleLogOut}
                        >
                            LogOut
                        </button>{" "}
                        and{" "}
                        <Link to="/login">
                            <button className="text-white bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600 hover:bg-gradient-to-br focus:ring-0 focus:outline-none focus:ring-blue-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                                Login
                            </button>
                        </Link>{" "}
                        Back In
                    </p>
                </div>
            </section>
        </>
    );
};

export default NotFound;
