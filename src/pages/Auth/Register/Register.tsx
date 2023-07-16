/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

type RegisterFormValues = {
    name: string;
    email: string;
    password: string;
};

const Register = () => {
    const [loadingRegister, setLoadingRegister] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormValues>();

    // const navigate = useNavigate();

    const handleRegister: SubmitHandler<RegisterFormValues> = (data) => {
        // const { name, password, email } = data;
        toast.success("Register successfully!");
    };

    return (
        <>
            <div className="container my-14 sm:my-8">
                <div className="w-[560px] sm:w-[280px] m-auto p-8 sm:p-4 bg-secondary rounded-lg">
                    <h2 className="text-center font-medium text-primary text-2xl">
                        Register Now!
                    </h2>

                    <form onSubmit={handleSubmit(handleRegister)}>
                        <div className="mb-3">
                            <label
                                htmlFor="name"
                                className="block mb-2 text-sm font-medium text-primary"
                            >
                                Name
                            </label>
                            <input
                                {...register("name", {
                                    required: "Name Is Required!",
                                })}
                                type="text"
                                placeholder="Your Name"
                                className="input input-bordered input-success w-full text-primary"
                            />
                            {errors.name && (
                                <p className="text-red-600">
                                    {errors.name?.message}
                                </p>
                            )}
                        </div>
                        <div className="mb-3">
                            <label
                                htmlFor="email"
                                className="block mb-2 text-sm font-medium text-primary"
                            >
                                Email
                            </label>
                            <input
                                {...register("email", {
                                    required: "Email Address Is Required!",
                                })}
                                type="email"
                                placeholder="Enter Your Email"
                                className="input input-bordered input-success w-full text-primary"
                            />
                            {errors.email && (
                                <p className="text-red-600">
                                    {errors.email?.message}
                                </p>
                            )}
                        </div>

                        <div className="mb-3">
                            <label
                                htmlFor="password"
                                className="block mb-2 text-sm font-medium text-primary"
                            >
                                Password
                            </label>
                            <input
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message:
                                            "Password should be 6 characters or longer",
                                    },
                                })}
                                type="password"
                                placeholder="Enter Your Password"
                                className="input input-bordered input-success w-full text-primary"
                            />
                            {errors.password && (
                                <p className="text-red-600">
                                    {errors.password?.message}
                                </p>
                            )}
                        </div>
                        <button
                            disabled={loadingRegister}
                            type="submit"
                            className="btn block hover:bg-transparent hover:text-primary text-white btn-primary disabled:opacity-75 disabled:border-2 disabled:border-primary disabled:text-primary mt-2"
                        >
                            {loadingRegister ? "Loading" : "Register"}
                        </button>
                    </form>
                    <hr className="my-4"></hr>
                    <p className="text-primary">
                        Already Do You Have a Account?{" "}
                        <Link className="text-success" to="/login">
                            Login Now
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Register;
