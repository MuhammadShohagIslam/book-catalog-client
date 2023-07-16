/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-misused-promises */
import jwt_decode from "jwt-decode";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useCreateUserMutation } from "../../../redux/features/users/userApi";
import { getUser } from "../../../redux/features/users/usersSlice";
import { useAppDispatch } from "../../../redux/hook";
import { userJwtPayload } from "../../../types/jwtPayloadInterface";

type RegisterFormValues = {
    fullName: string;
    email: string;
    password: string;
};

const Register = () => {
    const dispatch = useAppDispatch();
    const [createUser, { isLoading }] = useCreateUserMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormValues>();

    const navigate = useNavigate();

    const handleRegister: SubmitHandler<RegisterFormValues> = async (data) => {
        const { fullName, password, email } = data;

        const createUserData = {
            name: fullName,
            email: email,
            password: password,
        };

        const result = await createUser(createUserData);
        
        if ("data" in result) {
            if (result.data.statusCode === 200) {
                const decoded: userJwtPayload = jwt_decode(
                    result.data.data.accessToken as string
                );
                dispatch(
                    getUser({
                        email: decoded?.email,
                        role: decoded?.role,
                    })
                );
                localStorage.setItem(
                    "token",
                    result.data.data.accessToken as string
                );
                toast.success("User registration successfully!");
                navigate("/");
            }
        } else {
            toast.error("User registration failed!");
        }
    };

    return (
        <>
            <div className="container flex items-center justify-center h-screen mx-auto">
                <div className="lg:w-[560px] sm:w-[280px] m-auto py-12  bg-blue-100 rounded-lg">
                    <h2 className="text-center font-medium text-primary text-2xl mb-10">
                        Register Now!
                    </h2>

                    <form
                        onSubmit={handleSubmit(handleRegister)}
                        className="px-10 pt-4"
                    >
                        <div className="relative z-0 w-full mb-10 group">
                            <input
                                {...register("fullName", {
                                    required: "Full Name Is Required!",
                                })}
                                type="text"
                                name="fullName"
                                autoComplete="off"
                                autoCapitalize="off"
                                autoCorrect="off"
                                id="floating_name"
                                className="block py-2 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:bg-transparent focus:ring-0 focus:border-blue-600"
                                required
                            />
                            <label
                                htmlFor="floating_name"
                                className="absolute text-md text-gray-900 -top-4 font-semibold"
                            >
                                Full Name
                            </label>
                            {errors.fullName && (
                                <p className="text-red-600">
                                    {errors.fullName?.message}
                                </p>
                            )}
                        </div>
                        <div className="relative z-0 w-full mb-10 group">
                            <input
                                {...register("email", {
                                    required: "Email Is Required!",
                                })}
                                type="email"
                                autoComplete="off"
                                autoCapitalize="off"
                                autoCorrect="off"
                                name="email"
                                id="floating_email"
                                className="block py-2 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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
                                type="password"
                                name="password"
                                autoComplete="off"
                                autoCapitalize="off"
                                autoCorrect="off"
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
                            {isLoading ? "Loading" : "Register"}
                        </button>
                    </form>

                    <p className="text-primary text-center mt-3 ">
                        Already Do You Have a Account?{" "}
                        <Link
                            className="text-gray-800 hover:text-blue-700 font-semibold"
                            to="/login"
                        >
                            Login Now
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Register;
