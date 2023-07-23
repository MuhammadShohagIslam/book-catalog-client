/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import moment from "moment";
import { FiUser } from "react-icons/fi";
import { GiSpellBook } from "react-icons/gi";
import { FaHeartBroken, FaBookOpen } from "react-icons/fa";
import { BsCalendar2Date } from "react-icons/bs";
import { IBook } from "../../../types/book.type";

type RecentBookCardProp = {
    data: IBook;
    wishListReadBookData?: string;
    isWishList?: boolean;
    isReadCompleteBook?: boolean;
    isReadBook?: boolean;
    handleWishlistBook?: (data: string) => void;
    handleReadingBookSoon?: (data: string) => void;
    handleReadingCompleteBook?: (data: string) => void;
    handleAddReadingCompletedBook?: (data: string) => void;
    isLoading?: boolean;
    isLoadingReadingSoon?: boolean;
};
const RecentBookCard = ({
    data,
    isWishList = false,
    isReadCompleteBook = false,
    isReadBook = false,
    handleWishlistBook,
    isLoading,
    handleReadingBookSoon,
    handleReadingCompleteBook,
    handleAddReadingCompletedBook,
    wishListReadBookData,
    isLoadingReadingSoon,
}: RecentBookCardProp) => {
    return (
        <div className="flex flex-col items-center justify-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 p-3">
            {data?.image ? (
                <Link
                    to={`/books/${data?._id}`}
                    className=" w-full flex items-center justify-center  h-72"
                >
                    <img
                        className="object-cover w-full rounded-t-lg h-full md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                        src={data?.image}
                        alt=""
                    />
                </Link>
            ) : (
                <Link to={`/books/${data?._id}`} className="w-1/2">
                    <img
                        className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                        src="https://data2.dawateislami.net/Data/Books/Read/ur/2014/1188/bt1188.jpg"
                        alt=""
                    />
                </Link>
            )}

            <div className="flex flex-col justify-between p-4 leading-normal">
                <div>
                    <Link to={`/books/${data?._id}`}>
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                            {data?.title}
                        </h5>
                        <div className="flex justify-between mt-2 flex-wrap ">
                            <div className="flex items-center mb-1">
                                <span className="mr-2">
                                    <FiUser className="text-gray-800" />
                                </span>
                                <span>{data?.author}</span>
                            </div>
                            <div className="flex items-center">
                                <span className="mr-2">
                                    {" "}
                                    <BsCalendar2Date className="text-gray-800 " />
                                </span>
                                <span>
                                    {moment(data?.publicationDate)
                                        .format("ll")
                                        .toString()}
                                </span>
                            </div>
                        </div>
                        <div className="mt-3">
                            <span className="text-gray-700 font-semibold">
                                Genre:
                            </span>{" "}
                            {data?.genre}
                        </div>
                    </Link>
                </div>
                {(isWishList || isReadBook || isReadCompleteBook) && (
                    <div className="mt-4">
                        {isWishList && (
                            <>
                                <button
                                    onClick={() =>
                                        handleWishlistBook &&
                                        wishListReadBookData &&
                                        handleWishlistBook(wishListReadBookData)
                                    }
                                    type="button"
                                    id="WishListId"
                                    className="text-white bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600 hover:bg-gradient-to-br focus:ring-0 focus:outline-none focus:ring-blue-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                                >
                                    {isLoading ? "Loading" : <FaHeartBroken />}
                                </button>
                                <Tooltip
                                    anchorSelect="#WishListId"
                                    content="Removed Book From Wish List"
                                />
                            </>
                        )}

                        {isReadBook && (
                            <>
                                <button
                                    onClick={() =>
                                        handleReadingBookSoon &&
                                        wishListReadBookData &&
                                        handleReadingBookSoon(
                                            wishListReadBookData
                                        )
                                    }
                                    type="button"
                                    id="readBookSoonId"
                                    className="text-white bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600 hover:bg-gradient-to-br focus:ring-0 focus:outline-none focus:ring-blue-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                                >
                                    {isLoadingReadingSoon
                                        ? "Loading"
                                        :  <FaBookOpen />}
                                </button>
                                <Tooltip
                                    anchorSelect="#readBookSoonId"
                                    content="Removed  From Read Book Soon"
                                />
                                <button
                                    onClick={() =>
                                        handleAddReadingCompletedBook &&
                                        wishListReadBookData &&
                                        handleAddReadingCompletedBook(
                                            wishListReadBookData
                                        )
                                    }
                                    type="button"
                                    id="completedReadBook"
                                    className="text-white bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600 hover:bg-gradient-to-br focus:ring-0 focus:outline-none focus:ring-blue-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                                >
                                     <GiSpellBook/>
                                </button>
                                <Tooltip
                                    anchorSelect="#completedReadBook"
                                    content="Completed Read Book"
                                />
                            </>
                        )}
                        {isReadCompleteBook && (
                            <>
                                <button
                                    onClick={() =>
                                        handleReadingCompleteBook &&
                                        wishListReadBookData &&
                                        handleReadingCompleteBook(
                                            wishListReadBookData
                                        )
                                    }
                                    id="readingCompleted"
                                    type="button"
                                    className="text-white bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600 hover:bg-gradient-to-br focus:ring-0 focus:outline-none focus:ring-blue-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                                >
                                    {isLoadingReadingSoon
                                        ? "Loading"
                                        : <GiSpellBook/>}
                                </button>
                                <Tooltip
                                    anchorSelect="#readingCompleted"
                                    content="Removed From Completed Read Book"
                                />
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecentBookCard;
