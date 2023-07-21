/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unused-vars */
import RecentBookCard from "../../components/shared/Card/RecentBookCard";
import Spinner from "../../components/shared/Loader/Spinner";
import { useGetUserQuery } from "../../redux/features/users/userApi";
import { IBook } from "../../types/book.type";

const ReadSoon = () => {
    const { data, isLoading, isError } = useGetUserQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });
    
    let content;

    if (data?.data.readSoonBook?.length) {
        content = data?.data.readSoonBook?.map(
            (d: { bookId: IBook; _id: string }) => (
                <RecentBookCard key={d._id} data={d.bookId} />
            )
        );
    }

    if (!data?.data.readSoonBook?.length) {
        content = (
            <div className="col-span-3 flex justify-center  text-blue-600 font-bold text-xl h-screen">
                <h2>No Blog Yet Mark Read Soon!</h2>
            </div>
        );
    }

    if (isLoading && !isError) {
        content = <Spinner style={"col-span-3 h-[450px]"} />;
    }


    return (
        <section className="container mx-auto pt-10 pb-28">
            <h2 className="text-blue-700 font-bold text-2xl">
               Read Soon Book By {data?.data?.name}
            </h2>
            <div className="grid grid-cols-3 gap-6 mt-12">{content}</div>
        </section>
    );
};

export default ReadSoon;


