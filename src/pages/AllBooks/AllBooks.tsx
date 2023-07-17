/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import SearchFiltering from "../../components/shared/Form/SearchFiltering";
import Spinner from "../../components/shared/Loader/Spinner";
import RecentBookCard from "../../components/shared/Card/RecentBookCard";
import { useAllBooksQuery } from "../../redux/features/books/bookApi";
import { IBook } from "../../types/book.type";

const AllBooks = () => {
    const { data, isLoading, isError } = useAllBooksQuery(undefined);

    let content;

    if (data?.data?.length > 0) {
        content = data?.data?.map((d: IBook) => (
            <RecentBookCard key={d._id} data={d} />
        ));
    }
    if (isLoading && !isError) {
        content = <Spinner style={"col-span-3 h-52"} />;
    }
    
    return (
        <section className="container mx-auto pt-10 pb-28">
            <div className="w-[50%] mx-auto">
                <SearchFiltering />
            </div>

            <div className="grid grid-cols-3 gap-6 mt-16">{content}</div>
        </section>
    );
};

export default AllBooks;
