/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unused-vars */
import RecentBookCard from "../../components/shared/Card/RecentBookCard";
import Spinner from "../../components/shared/Loader/Spinner";
import {
    useDeleteWishListMutation,
    useGetUserQuery,
} from "../../redux/features/users/userApi";
import { IBook } from "../../types/book.type";
import { toast } from "react-hot-toast";

const WishList = () => {
    
    const {
        data,
        isLoading: isGetUserLoading,
        isError,
        refetch
    } = useGetUserQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });

    const [deleteWishList, { isLoading }] = useDeleteWishListMutation();

    const handleWishlistBook = async (data: string) => {
        if (data) {
            const result = await deleteWishList({
                bookId: data,
            });
            if ("data" in result) {
                if (result?.data?.statusCode === 200) {
                    toast.success("Removed Book To Wish List successfully!");
                    refetch()
                }
            } else {
                toast.error("Removed Book To Wish List failed!");
            }
        }
    };

    let content;

    if (data?.data?.wishList?.length) {
        content = data?.data?.wishList?.map(
            (d: { bookId: IBook; _id: string }) => (
                <RecentBookCard
                    key={d._id}
                    wishListReadBookData={d._id}
                    handleWishlistBook={handleWishlistBook}
                    data={d.bookId}
                    isWishList
                    isLoading={isLoading}
                />
            )
        );
    }

    if (!data?.data?.wishList?.length) {
        content = (
            <div className="col-span-3 flex justify-center  text-blue-600 font-bold text-xl h-screen">
                <h2>No Book Yet Add As a Wish List!</h2>
            </div>
        );
    }

    if (isGetUserLoading && !isError) {
        content = <Spinner style={"col-span-3 h-[450px]"} />;
    }

    return (
        <section className="container mx-auto pt-10 pb-28">
            <h2 className="text-blue-700 font-bold text-2xl">
                Wish list Book By {data?.data?.name}
            </h2>
            <div className="grid grid-cols-3 gap-6 mt-12">{content}</div>
        </section>
    );
};

export default WishList;
