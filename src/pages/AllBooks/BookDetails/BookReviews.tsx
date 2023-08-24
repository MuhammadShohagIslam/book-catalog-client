/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { FaUserAlt } from "react-icons/fa";
import { IBook } from "../../../types/book.type";
import { useCreateReviewMutation } from "../../../redux/features/books/bookApi";

type ReviewFormValues = {
    email: string;
    name: string;
    review: string;
};

const BookReviews = ({ bookData }: { bookData: IBook }) => {
    const [createReview, { isLoading, isError }] = useCreateReviewMutation();

    const {
        register,
        handleSubmit,
        reset,
    } = useForm<ReviewFormValues>();

    const handleReview: SubmitHandler<ReviewFormValues> = async (data) => {
        const review = {
            name: data?.name,
            email: data?.email,
            review: data?.review,
            bookId: bookData?._id,
        };
        if (!bookData && isError) {
            return toast.error("You review Failed!");
        }
        const result = await createReview(review);

        if ("data" in result) {
            if (result?.data?.statusCode === 200) {
                toast.success("You review successfully!");
                reset();
            }
        } else {
            toast.error("You review failed!");
        }
    };

    return (
        <div className="pb-10 pt-5 w-[60%] mx-auto bg-white">
            <div className="mb-5 ">
                <h2 className="text-gray-800 font-semibold mb-5 pl-10 text-xl">
                    The List of{" "}
                    <span className="text-blue-700 py-1 px-1  rounded-full bg-primary">
                        {bookData?.reviews?.length}
                    </span>{" "}
                    {bookData?.reviews && bookData?.reviews?.length > 1
                        ? "reviews"
                        : "review"}{" "}
                </h2>
                {bookData?.reviews?.map((review) => (
                    <div
                        key={review?._id}
                        className="flex bg-white shadow ml-10 p-6 mb-2 gap-2 rounded-md cursor-pointer"
                    >
                        <div>
                            <FaUserAlt className="h-10 w-10 rounded-full text-gray-700" />
                        </div>
                        <div>
                            <div>
                                <h4 className="text-gray-600">{review?.name}</h4>
                                <p className="text-gray-500">
                                    {" "}
                                    {review?.review}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <form
                className="py-6 lg:px-11 px-5 bg-white"
                onSubmit={handleSubmit(handleReview)}
            >
                <h4 className="text-gray-800 font-semibold mb-5 text-xl">
                    Leave a Review on this Book
                </h4>
                <div>
                    <div className="grid lg:grid-cols-2 grid-cols-1 gap-5 mb-5">
                        <div>
                            <input
                                {...register("name", { required: true })}
                                type="text"
                                name="name"
                                className="placeholder:text-gray-800 px-5 rounded-md py-3 w-full focus:outline-0 text-gray-800  shadow"
                                placeholder="Please give your name"
                                required
                            />
                        </div>
                        <div>
                            <input
                                {...register("email", { required: true })}
                                type="email"
                                name="email"
                                className="placeholder:text-gray-800 px-5 rounded-md py-3 w-full focus:outline-0 text-gray-800  shadow"
                                placeholder="Please give your email"
                                required
                            />
                        </div>
                    </div>
                    <textarea
                        {...register("review", { required: true })}
                        id="review"
                        name="review"
                        rows={4}
                        className="rounded-md  shadow block px-5 py-4 w-full text-sm text-gray-800 h-32 focus:outline-0 placeholder:text-gray-800"
                        placeholder="Write your review here..."
                        required
                    ></textarea>
                </div>
                <button
                    disabled={isLoading}
                    className="bg-gray-100 shadow mt-4 w-40 h-11 hover:bg-gray-200 focus:ring-0 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm  px-5 py-2.5 text-center transition-all text-black "
                    type="submit"
                >
                    {isLoading ? "loading..." : "Review"}
                </button>
            </form>
        </div>
    );
};

export default BookReviews;
