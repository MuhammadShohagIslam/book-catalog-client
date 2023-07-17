/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Link } from "react-router-dom";
import moment from "moment";
import { FiUser } from "react-icons/fi";
import { BsCalendar2Date } from "react-icons/bs";
import { IBook } from "../../../types/book.type";

type RecentBookCardProp = {
    data: IBook;
};
const RecentBookCard = ({ data }: RecentBookCardProp) => {
    return (
        <Link
            to={`/books/${data?._id}`}
            className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 p-3"
        >
            {data?.image ? (
                <img
                    className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                    src={data?.image}
                    alt=""
                />
            ) : (
                <img
                    className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                    src="https://data2.dawateislami.net/Data/Books/Read/ur/2014/1188/bt1188.jpg"
                    alt=""
                />
            )}

            <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                    {data?.title}
                </h5>
                <div className="flex justify-between mt-2 flex-wrap ">
                    <div className="flex items-center mb-1">
                        <span className="mr-2">
                            <FiUser className="text-gray-800" />
                        </span>
                        <span>
                            {typeof data?.author !== "string" &&
                                data?.author?.name}
                        </span>
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
                    <span className="text-gray-700 font-semibold">Genre:</span>{" "}
                    {data?.genre}
                </div>
            </div>
        </Link>
    );
};

export default RecentBookCard;
