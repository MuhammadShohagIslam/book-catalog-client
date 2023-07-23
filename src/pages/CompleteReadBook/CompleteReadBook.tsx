/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { toast } from "react-hot-toast";
import RecentBookCard from "../../components/shared/Card/RecentBookCard";
import Spinner from "../../components/shared/Loader/Spinner";
import {
    useDeleteReadingCompleteMutation,
    useGetUserQuery,
} from "../../redux/features/users/userApi";
import { IBook } from "../../types/book.type";

const CompleteReadBook = () => {
    const {
        data,
        isLoading: getUserLoading,
        isError,
        refetch
    } = useGetUserQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });

    const [deleteReadingComplete, { isLoading }] = useDeleteReadingCompleteMutation();

    const handleReadingCompleteBook = async (data: string) => {
        if (data) {
            const result = await deleteReadingComplete({
                bookId: data,
            });
            if ("data" in result) {
                if (result?.data?.statusCode === 200) {
                    toast.success("Removed Book To Read Soon successfully!");
                    refetch()
                }
            } else {
                toast.error("Removed Book To Read Soon failed!");
            }
        }
    };



    let content;

    if (data?.data?.completedReadBook?.length) {
        content = data?.data.completedReadBook?.map(
            (d: { bookId: IBook; _id: string }) => (
                <RecentBookCard
                    key={d._id}
                    wishListReadBookData={d._id}
                    handleReadingCompleteBook={handleReadingCompleteBook}
                    data={d.bookId}
                    isReadCompleteBook
                    isLoadingReadingSoon={isLoading}
                />
            )
        );
    }

    if (!data?.data?.completedReadBook?.length) {
        content = (
            <div className="col-span-3 flex justify-center  text-blue-600 font-bold text-xl h-screen">
                <h2>No Book Yet Mark Read Complete Book!</h2>
            </div>
        );
    }

    if (getUserLoading && !isError) {
        content = <Spinner style={"col-span-3 h-[450px]"} />;
    }

    return (
        <section className="container mx-auto pt-10 pb-28">
            <h2 className="text-blue-700 font-bold text-2xl">
               Completed Book By {data?.data?.name}
            </h2>
            <div className="grid grid-cols-3 gap-6 mt-12">{content}</div>
        </section>
    );
};

export default CompleteReadBook;
