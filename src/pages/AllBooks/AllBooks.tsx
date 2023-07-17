/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import SearchFiltering from "../../components/shared/Form/SearchFiltering";
import Spinner from "../../components/shared/Loader/Spinner";
import RecentBookCard from "../../components/shared/Card/RecentBookCard";
import { useAllBooksQuery } from "../../redux/features/books/bookApi";
import { IBook } from "../../types/book.type";
import { useState } from "react";

const AllBooks = () => {
    const [filterDate, setFilterDate] = useState("all");
    const [searchValue, setSearchValue] = useState("");
    const [filterGenre, setFilterGenre] = useState("");
    const { data, isLoading, isError } = useAllBooksQuery({
        searchTerm: searchValue,
        genre: filterGenre,
    });

    const handleFilteringByGenre = (genre: string) => {
        setFilterGenre(genre);
    };
    const handleFilteringByPublishDate = (date: string) => {
        setFilterDate(date);
    };
    const handleSearchingBook = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    let content;

    if (data?.data?.length > 0) {
        content = data?.data
            ?.filter((d: IBook) => {
                if (filterDate === "all") {
                    return d;
                } else {
                    return (
                        new Date(d.createdAt as string).getFullYear() ===
                        Number(filterDate)
                    );
                }
            })
            .map((d: IBook) => <RecentBookCard key={d._id} data={d} />);
    }

    if (!data?.data?.length) {
        content = (
            <div className="col-span-3">
                <h2>No Blog Found!</h2>
            </div>
        );
    }
    if (isLoading && !isError) {
        content = <Spinner style={"col-span-3 h-52"} />;
    }

    console.log(filterGenre);

    return (
        <section className="container mx-auto pt-10 pb-28">
            <div className="w-[50%] mx-auto">
                <SearchFiltering
                    handleFilteringByGenre={handleFilteringByGenre}
                    handleFilteringByPublishDate={handleFilteringByPublishDate}
                    handleSearchingBook={handleSearchingBook}
                />
            </div>

            <div className="grid grid-cols-3 gap-6 mt-16">{content}</div>
        </section>
    );
};

export default AllBooks;
