/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import moment from "moment";
import { useNavigate, useLocation } from "react-router-dom";
import { FaHeart, FaBookOpen } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { Tooltip } from "react-tooltip";
import { BiEdit } from "react-icons/bi";
import BookInfoItem from "./BookInfoItem";
import { IBook } from "./../../../types/book.type";
import { useState } from "react";
import DeleteModal from "../../../components/shared/Modal/DeleteModal";
import { useAppSelector } from "../../../redux/hook";
import {
    useAddReadingSoonMutation,
    useAddWishListMutation,
} from "../../../redux/features/users/userApi";
import { toast } from "react-hot-toast";

const BookDetail = ({ data }: { data: IBook }) => {
    const [openDeleteModal, setDeleteModal] = useState(false);
    const [bookData, setBookData] = useState<IBook | undefined>(undefined);
    const user = useAppSelector((state) => state.local.user.user);

    const [addWishList, { isLoading }] = useAddWishListMutation();
    const [addReadingSoon, { isLoading: isLoadingReadingSoon }] =
        useAddReadingSoonMutation();

    const location = useLocation();
    const navigate = useNavigate();

    const handleDeleteBook = (data: IBook) => {
        if (!user?.email) {
            return navigate("/login", {
                state: {
                    from: location,
                },
            });
        }
        setBookData(data);
        setDeleteModal(!openDeleteModal);
    };

    const handleEditBook = (data: IBook) => {
        if (!user?.email) {
            return navigate("/login", {
                state: {
                    from: location,
                },
            });
        }
        navigate("/update-book", {
            state: data,
        });
    };
    const handleWishlistBook = async (data: IBook) => {
        if (!user?.email) {
            return navigate("/login", {
                state: {
                    from: location,
                },
            });
        }
        if (data?._id) {
            const result = await addWishList({
                bookId: data._id,
            });
            if ("data" in result) {
                if (result.data.statusCode === 200) {
                    toast.success("Add Book To Wish List successfully!");
                }
            } else {
                toast.error("Add Book To Wish List failed!");
            }
        }
    };
    const handleReadingBookSoonBook = async (data: IBook) => {
        if (!user?.email) {
            return navigate("/login", {
                state: {
                    from: location,
                },
            });
        }
        if (data?._id) {
            const result = await addReadingSoon({
                bookId: data._id,
            });
            if ("data" in result) {
                if (result.data.statusCode === 200) {
                    toast.success("Add Book To Read Soon List successfully!");
                }
            } else {
                toast.error("Add Book To Read Soon List failed!");
            }
        }
    };

    return (
        <>
            <div className="w-[60%] mx-auto py-16 bg-white">
                <div className="px-9 flex  items-center justify-between ">
                    <div className="mt-7">
                        <button
                            onClick={() => handleWishlistBook(data)}
                            type="button"
                            id="wishListIdForAdd"
                            className="text-white bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600 hover:bg-gradient-to-br focus:ring-0 focus:outline-none focus:ring-blue-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                        >
                            {isLoading ? "Loading" :<FaHeart/> }
                        </button>
                        <Tooltip
                            anchorSelect="#wishListIdForAdd"
                            content="Add To WishList"
                        />
                        <button
                            onClick={() => handleReadingBookSoonBook(data)}
                            type="button"
                            id="readingBookSoon"
                            className="text-white bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600 hover:bg-gradient-to-br focus:ring-0 focus:outline-none focus:ring-blue-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                        >
                            {isLoadingReadingSoon ? "Loading" : <FaBookOpen />}
                        </button>
                        <Tooltip
                            anchorSelect="#readingBookSoon"
                            content="Add to For Reading Book Soon"
                        />
                    </div>
                    <div className="flex gap-3">
                        <span
                            onClick={() => handleEditBook(data)}
                            className="flex items-center text-base hover:text-rose-500 text-secondary cursor-pointer"
                        >
                            <BiEdit className="text-xl" />
                        </span>
                        <span
                            onClick={() => handleDeleteBook(data)}
                            className="flex items-center text-base hover:text-rose-500 text-secondary cursor-pointer"
                        >
                            <AiFillDelete className="text-xl" />
                        </span>
                    </div>
                </div>

                <div className="flex flex-col items-center rounded-lg">
                    <img
                        className="object-cover w-full rounded-t-lg h-[400px] md:h-auto md:w-56 md:rounded-none md:rounded-l-lg"
                        src="https://data2.dawateislami.net/Data/Books/Read/ur/2014/1188/bt1188.jpg"
                        alt=""
                    />

                    <div className="mt-8 bg-gray-200">
                        <h2 className="text-center pt-5 font-bold text-gray-800 text-xl">
                            Book Details
                        </h2>
                        <div className="flex flex-col justify-between leading-normal bg-gray-200 mt-6">
                            <ul>
                                <BookInfoItem
                                    name="Book Title"
                                    value={data?.title}
                                />
                                <BookInfoItem
                                    name="Publication Date"
                                    value={`${moment(
                                        data?.publicationDate
                                    ).format("ll")}`}
                                />
                                <BookInfoItem
                                    name="Author"
                                    value={data?.author}
                                />
                                <BookInfoItem
                                    name="Genre"
                                    value={data?.genre}
                                />
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            {/* Language Delete Modal */}
            <DeleteModal
                openDeleteModal={openDeleteModal}
                setDeleteModal={setDeleteModal}
                data={bookData}
            />
        </>
    );
};

export default BookDetail;
