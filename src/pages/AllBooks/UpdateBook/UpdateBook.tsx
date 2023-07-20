/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import {
    useUpdateBookMutation
} from "../../../redux/features/books/bookApi";
import { IBook } from "../../../types/book.type";
import { useAppSelector } from "../../../redux/hook";
import { useEffect } from "react";

const UpdateBook = () => {
    // const param = useParams();
    // const { data } = useSingleBookQuery(param?.id as string);
    // console.log(param?.id, data);
    const param = useLocation();
    const [updateBook, { isLoading }] = useUpdateBookMutation();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Pick<IBook, "genre" | "image" | "title">>({
        defaultValues: {
            title: "",
            image: "",
            genre: "",
        },
    });

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, []);

    useEffect(() => {
        reset({
            title: param?.state?.title,
            image: param?.state?.image,
            genre: param?.state?.genre,
        });
    }, [reset, param?.state]);

    const navigate = useNavigate();

    const handleEditBook: SubmitHandler<
        Pick<IBook, "genre" | "image" | "title">
    > = async (data) => {
        const { genre, image, title } = data;

        

        const updatedBookData = {
            id: param?.state?._id,
            data: {
                genre,
                image,
                title,
            },
        };

        const result = await updateBook(updatedBookData);

        if ("data" in result) {
            if (result.data.statusCode === 200) {
                toast.success("Update Book successfully!");
                navigate(-1);
            }
        } else {
            toast.error("Book Update failed!");
        }
    };
    return (
        <div className="container flex items-center justify-center  mx-auto py-32">
            <div className="lg:w-[50%] sm:w-[280px] m-auto py-12  bg-blue-100 rounded-lg">
                <h2 className="text-center font-medium text-primary text-2xl mb-5">
                    Edit Book
                </h2>

                <form
                    onSubmit={handleSubmit(handleEditBook)}
                    className="px-10 pt-4"
                >
                    <div className="relative z-0 w-full mb-6 group">
                        <label
                            htmlFor="title"
                            className=" text-md text-gray-900 mb-1  font-semibold"
                        >
                            Book Title
                        </label>
                        <input
                            {...register("title", {
                                required: "Book Title Is Required!",
                            })}
                            type="text"
                            name="title"
                            id="title"
                            className="py-2 px-4 w-full text-base rounded-sm text-gray-900  border-0 border-b-2 border-gray-300 "
                        />

                        {errors.title && (
                            <p className="text-red-600">
                                {errors.title?.message}
                            </p>
                        )}
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <label
                            htmlFor="image"
                            className=" text-md text-gray-900 mb-1 font-semibold"
                        >
                            Book Image
                        </label>
                        <input
                            {...register("image", {
                                required: "Book Image Is Required!",
                            })}
                            type="text"
                            name="image"
                            id="image"
                            className="py-2 px-4 w-full text-base rounded-sm text-gray-900  border-0 border-b-2 border-gray-300 "
                        />

                        {errors.image && (
                            <p className="text-red-600">
                                {errors.image?.message}
                            </p>
                        )}
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <label
                            htmlFor="genre"
                            className=" text-md text-gray-900 mb-1  font-semibold"
                        >
                            Book Genre
                        </label>
                        <select
                            {...register("genre", {
                                required: "Book Genre Is Required!",
                            })}
                            name="genre"
                            id="genre"
                            className="py-2 px-4 w-full text-base rounded-sm text-gray-900  border-0 border-b-2 border-gray-300 "
                        >
                            <option value="">Choose A Book genre</option>
                            <option value="Beliefs">Beliefs</option>
                            <option value="Hadith">Hadith </option>
                            <option value="Islamic Life">Islamic Life</option>
                            <option value="Fiction">Fiction</option>
                            <option value="History">History</option>
                        </select>

                        {errors.genre && (
                            <p className="text-red-600">
                                {errors.genre?.message}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="text-white bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                    >
                        {" "}
                        {isLoading ? "Loading" : "Update Book"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateBook;
