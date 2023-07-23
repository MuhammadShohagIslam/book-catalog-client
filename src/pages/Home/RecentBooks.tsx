/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useEffect } from "react";
import RecentBookCard from "../../components/shared/Card/RecentBookCard";
import Spinner from "../../components/shared/Loader/Spinner";
import SectionTitle from "../../components/shared/SectionTitle/SectionTitle";
import { useAllBooksQuery } from "../../redux/features/books/bookApi";
import { IBook } from "../../types/book.type";

const RecentBooks = () => {
    const { data, isLoading, isError } = useAllBooksQuery({
        searchTerm: "",
        genre: "",
    });

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, []);

    let content;

    if (data?.data?.length > 0) {
        content = data?.data
            ?.slice(0, 10)
            .map((d: IBook) => <RecentBookCard key={d._id} data={d} />);
    }

    if (!data?.data?.length) {
        content = (
            <div className="col-span-3 flex justify-center  text-blue-600 font-bold text-xl mt-10 h-72">
                <h2>No Book Found!</h2>
            </div>
        );
    }
    
    if (isLoading && !isError) {
        content = <Spinner style={"col-span-3 h-52"} />;
    }

    return (
        <div className="container mx-auto py-24">
            <SectionTitle title="Recent Book" />
            <div className="grid grid-cols-3 gap-6 ">{content}</div>
        </div>
    );
};

export default RecentBooks;
