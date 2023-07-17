import { useState } from "react";

const SearchFiltering = () => {
    const [openGenres, setOpenGenres] = useState(false);
    const [openPublishDate, setOpenPublishDate] = useState(false);

    return (
        <form>
            <div className="flex relative">
                <button
                    id="dropdown-button"
                    className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-1 focus:outline-none focus:ring-gray-100 "
                    onClick={() => {
                        setOpenGenres(!openGenres), setOpenPublishDate(false);
                    }}
                    type="button"
                >
                    All Genres{" "}
                    <svg
                        className="w-2.5 h-2.5 ml-2.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                    >
                        <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="m1 1 4 4 4-4"
                        />
                    </svg>
                </button>
                {openGenres && (
                    <div className="z-10 absolute top-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 ">
                        <ul
                            className="py-2 text-sm text-gray-700 "
                            aria-labelledby="dropdown-button"
                        >
                            <li>
                                <button
                                    onClick={() => setOpenGenres(!openGenres)}
                                    type="button"
                                    className="inline-flex w-full px-4 py-2 hover:bg-gray-100 "
                                >
                                    Mockups
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => setOpenGenres(!openGenres)}
                                    type="button"
                                    className="inline-flex w-full px-4 py-2 hover:bg-gray-100 "
                                >
                                    Templates
                                </button>
                            </li>
                            <li>
                                <button
                                    type="button"
                                    onClick={() => setOpenGenres(!openGenres)}
                                    className="inline-flex w-full px-4 py-2 hover:bg-gray-100 "
                                >
                                    Design
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => setOpenGenres(!openGenres)}
                                    type="button"
                                    className="inline-flex w-full px-4 py-2 hover:bg-gray-100 "
                                >
                                    Logos
                                </button>
                            </li>
                        </ul>
                    </div>
                )}

                <div className="relative w-full">
                    <input
                        type="search"
                        className="block p-3 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                        placeholder="Search Book Based on Title, Author, or Genre..."
                        required
                    />
                    <button
                        type="submit"
                        className="absolute top-0 right-0 p-3.5 text-sm font-medium h-full text-white bg-blue-600   hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 "
                    >
                        <svg
                            className="w-4 h-4"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                        >
                            <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                        </svg>
                        <span className="sr-only">Search</span>
                    </button>
                </div>
                <button
                    id="dropdown-button"
                    className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-r-lg hover:bg-gray-200 focus:ring-1 focus:outline-none focus:ring-gray-100 "
                    onClick={() => {
                        setOpenPublishDate(!openPublishDate),
                            setOpenGenres(false);
                    }}
                    type="button"
                >
                    All Publication Date{" "}
                    <svg
                        className="w-2.5 h-2.5 ml-2.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                    >
                        <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="m1 1 4 4 4-4"
                        />
                    </svg>
                </button>
                {openPublishDate && (
                    <div className="z-10 absolute right-0 top-11 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 ">
                        <ul
                            className="py-2 text-sm text-gray-700 "
                            aria-labelledby="dropdown-button"
                        >
                            <li>
                                <button
                                    onClick={() =>
                                        setOpenPublishDate(!openPublishDate)
                                    }
                                    type="button"
                                    className="inline-flex w-full px-4 py-2 hover:bg-gray-100 "
                                >
                                    2023
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() =>
                                        setOpenPublishDate(!openPublishDate)
                                    }
                                    type="button"
                                    className="inline-flex w-full px-4 py-2 hover:bg-gray-100 "
                                >
                                    2022
                                </button>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </form>
    );
};

export default SearchFiltering;
