/* eslint-disable @typescript-eslint/restrict-template-expressions */
import moment from "moment";
import { AiFillDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import BookInfoItem from "./BookInfoItem";
import { IBook } from "./../../../types/book.type";
import { useState } from "react";
import { Link } from "react-router-dom";
import DeleteModal from "../../../components/shared/Modal/DeleteModal";


const BookDetail = ({ data }: { data: IBook }) => {
    const [openDeleteModal, setDeleteModal] = useState(false);
    const [bookData, setBookData] = useState<IBook | undefined>(undefined);


    const handleDeleteLanguage = (data: IBook) => {
        setBookData(data);
        setDeleteModal(!openDeleteModal);
    };


    return (
        <>
            <div className="w-[60%] mx-auto py-16 bg-white">
                <div className="pr-9  flex gap-3 items-center justify-end ">
                    <Link
                        to={`/books/update/${data?._id}`}
                        className={`flex items-center text-base hover:text-secondary text-primary cursor-pointer`}
                    >
                        <BiEdit className="text-xl" />
                    </Link>
                    <span
                        onClick={() => handleDeleteLanguage(data)}
                        className="flex items-center text-base hover:text-rose-500 text-secondary cursor-pointer"
                    >
                        <AiFillDelete className="text-xl" />
                    </span>
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
                                    value={
                                        typeof data?.author !== "string" &&
                                        data?.author?.name
                                    }
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
