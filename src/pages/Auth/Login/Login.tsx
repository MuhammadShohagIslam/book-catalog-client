/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useLoginUserMutation } from "../../../redux/features/users/userApi";
import { userJwtPayload } from "../../../types/jwtPayloadInterface";
import jwt_decode from "jwt-decode";
import { getUser } from "../../../redux/features/users/usersSlice";
import { useAppDispatch } from "../../../redux/hook";

type LoginFormValues = {
    email: string;
    password: string;
};

const Login = () => {
    const dispatch = useAppDispatch();

    const [loginUser, { isLoading }] = useLoginUserMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormValues>();

    const navigate = useNavigate();

    const location = useLocation();
    const from = location.state?.from?.pathname || "/"; 

    const handleLogin: SubmitHandler<LoginFormValues> = async (data) => {
        const { password, email } = data;

        const createUserData = {
            email: email,
            password: password,
        };
        const result = await loginUser(createUserData);
        if ("data" in result) {
            if (result.data.statusCode === 200) {
                const decoded: userJwtPayload = jwt_decode(
                    result.data.data.accessToken as string
                );
                dispatch(
                    getUser({
                        email: decoded?.email,
                        role: decoded?.role,
                        userId: decoded?.userId,
                        name: decoded?.name,
                    })
                );
                localStorage.setItem(
                    "token",
                    result.data.data.accessToken as string
                );
                toast.success("User login successfully!");
                navigate(from, { replace: true })
            }
        } else {
            toast.error("User login failed!");
        }
    };

    return (
        <>
            <div className="container flex items-center justify-center h-screen mx-auto">
                <div className="lg:w-[560px] sm:w-[280px] m-auto py-12  bg-blue-100 rounded-lg">
                    <h2 className="text-center font-medium text-primary text-2xl mb-10">
                        Login Now!
                    </h2>

                    <form
                        onSubmit={handleSubmit(handleLogin)}
                        className="px-10 pt-4"
                    >
                        <div className="relative z-0 w-full mb-10 group">
                            <input
                                {...register("email", {
                                    required: "Email Is Required!",
                                })}
                                autoComplete="off"
                                autoCapitalize="off"
                                autoCorrect="off"
                                type="email"
                                name="email"
                                id="floating_email"
                                className="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                required
                            />
                            <label
                                htmlFor="floating_email"
                                className="absolute text-md text-gray-900 -top-4 font-semibold"
                            >
                                Email
                            </label>
                            {errors.email && (
                                <p className="text-red-600">
                                    {errors.email?.message}
                                </p>
                            )}
                        </div>

                        <div className="relative z-0 w-full mb-6 group">
                            <input
                                {...register("password", {
                                    required: "Password Is Required!",
                                })}
                                autoComplete="off"
                                autoCapitalize="off"
                                autoCorrect="off"
                                type="password"
                                name="password"
                                id="floating_password"
                                className="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                required
                            />
                            <label
                                htmlFor="floating_password"
                                className="absolute text-md text-gray-900 -top-4 font-semibold"
                            >
                                Password
                            </label>
                            {errors.password && (
                                <p className="text-red-600">
                                    {errors.password?.message}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="text-white bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                        >
                            {" "}
                            {isLoading ? "Loading" : "Login"}
                        </button>
                    </form>

                    <p className="text-primary text-center mt-3">
                        If You Do Not Have a Account?{" "}
                        <Link
                            className="text-gray-800 hover:text-blue-700 font-semibold"
                            to="/register"
                        >
                            Register Now
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Login;
