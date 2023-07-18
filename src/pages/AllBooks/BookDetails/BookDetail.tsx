/* eslint-disable @typescript-eslint/restrict-template-expressions */
import moment from "moment";
import BookInfoItem from "./BookInfoItem";
import { IBook } from "./../../../types/book.type";

const BookDetail = ({ data }: { data: IBook }) => {
    return (
        <div className="w-[60%] mx-auto py-10 bg-white">
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
                                value={`${moment(data?.publicationDate).format(
                                    "ll"
                                )}`}
                            />
                            <BookInfoItem
                                name="Author"
                                value={
                                    typeof data?.author !== "string" &&
                                    data?.author?.name
                                }
                            />
                            <BookInfoItem name="Genre" value={data?.genre} />
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDetail;
