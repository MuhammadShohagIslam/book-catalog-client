/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import SearchFiltering from "../../components/shared/Form/SearchFiltering";
import Spinner from "../../components/shared/Loader/Spinner";
import RecentBookCard from "../../components/shared/Card/RecentBookCard";
import { useAllBooksQuery } from "../../redux/features/books/bookApi";
import { IBook } from "../../types/book.type";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AllBooks = () => {
    const [filterDate, setFilterDate] = useState("all");
    const [searchValue, setSearchValue] = useState("");
    const [filterGenre, setFilterGenre] = useState("all");
    const { data, isLoading, isError } = useAllBooksQuery({
        searchTerm: searchValue,
        genre: filterGenre === "all" ? "" : filterGenre,
    });

    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, []);

    const handleFilteringByGenre = (genre: string) => {
        setFilterGenre(genre);
    };
    const handleFilteringByPublishDate = (date: string) => {
        setFilterDate(date);
    };
    const handleSearchingBook = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    const blogFilterByYear = data?.data?.filter((d: IBook) => {
        if (filterDate === "all") {
            return d;
        } else {
            return (
                new Date(d?.createdAt as string).getFullYear() ===
                Number(filterDate)
            );
        }
    });

    let content;

    if (blogFilterByYear?.length) {
        content = blogFilterByYear.map((d: IBook) => (
            <RecentBookCard key={d?._id} data={d} />
        ));
    } else {
        if (
            data?.data?.length > 0 &&
            blogFilterByYear?.length &&
            (searchValue || filterGenre !== "all")
        ) {
            content = data?.data?.map((d: IBook) => (
                <RecentBookCard key={d?._id} data={d} />
            ));
        } else {
            content = (
                <div className="col-span-3 flex justify-center  text-blue-600 font-bold text-xl h-screen">
                    <h2>No Book Found!</h2>
                </div>
            );
        }
    }

    if (isLoading && !isError) {
        content = <Spinner style={"col-span-3 h-[450px]"} />;
    }

    return (
        <section className="container mx-auto pt-10 pb-28">
            <div className="w-[55%] mx-auto">
                <SearchFiltering
                    handleFilteringByGenre={handleFilteringByGenre}
                    handleFilteringByPublishDate={handleFilteringByPublishDate}
                    handleSearchingBook={handleSearchingBook}
                />
            </div>
            <div className="flex justify-between">
                <div>
                    {(filterGenre !== "all" ||
                        searchValue ||
                        filterDate !== "all") && (
                        <h2 className="text-xl text-gray-800 mt-6">
                            Book Find by{"  "}
                            <span className="text-blue-600 font-bold">
                                {filterGenre !== "all" && filterGenre}
                            </span>
                            <span className="text-blue-600 font-bold">
                                {filterDate &&
                                    ` ${
                                        filterGenre === "all" ||
                                        filterDate === "all"
                                            ? ""
                                            : "&"
                                    }  ${
                                        filterDate === "all" ? "" : filterDate
                                    }`}
                            </span>
                            <span className="text-blue-600 font-bold">
                                {searchValue &&
                                    ` ${
                                        filterDate === "all" &&
                                        filterGenre === "all"
                                            ? ""
                                            : "&"
                                    }  ${searchValue}`}
                            </span>
                        </h2>
                    )}
                </div>
                <div>
                    <button
                        onClick={() => navigate("/add-book")}
                        type="button"
                        className="text-white bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                    >
                        Add Book
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-6 mt-12">{content}</div>
        </section>
    );
};

export default AllBooks;
