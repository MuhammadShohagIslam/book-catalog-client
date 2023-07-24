/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { toast } from "react-hot-toast";
import { useDeleteBookMutation } from "../../../redux/features/books/bookApi";
import { useAppSelector } from "../../../redux/hook";
import { useNavigate } from "react-router-dom";
import { IBook } from "../../../types/book.type";

type DeleteModalPropType = {
    openDeleteModal: boolean;
    setDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
    data: IBook | undefined;
};

const DeleteModal = ({
    openDeleteModal,
    setDeleteModal,
    data,
}: DeleteModalPropType) => {
    const [deleteBook, { isLoading }] = useDeleteBookMutation();
    const user = useAppSelector((state) => state.local.user.user);
    const navigate = useNavigate();

    const handleDelete = async (id: string) => {
        if (typeof data?.user !== "string" && user?.name !== data?.user?.name) {
            setDeleteModal(!openDeleteModal);
            return toast.error("Your not able to delete book!");
        }
        const result = await deleteBook(id);

        if ("data" in result) {
            if (result.data.statusCode === 200) {
                toast.success("Book Deleted successfully!");
                navigate("/");
            }
        } else {
            toast.error("Book Deleted failed!");
        }
    };
    return (
        <div
            className={`fixed top-0 left-0 z-50 p-4 overflow-x-hidden overflow-y-auto inset-0 h-[calc(100%-1rem)] max-h-full backdrop-blur-sm bg-white/30 ${
                openDeleteModal ? "block" : "hidden"
            }`}
        >
            <div className="relative w-full max-w-md max-h-full mt-40 mx-auto">
                <div className="relative bg-white rounded-lg shadow">
                    <button
                        onClick={() => setDeleteModal(!openDeleteModal)}
                        type="button"
                        className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                    >
                        <svg
                            aria-hidden="true"
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="p-6 text-center">
                        <svg
                            aria-hidden="true"
                            className="mx-auto mb-4 text-rose-400 w-14 h-14 "
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                        </svg>
                        <h3 className="mb-5 text-lg font-normal text-gray-500 ">
                            Are You Sure You Want To Delete {data?.title}?
                        </h3>
                        <div className="flex justify-center gap-2">
                            <button
                                disabled={isLoading}
                                onClick={() =>
                                    handleDelete(data?._id as string)
                                }
                                type="submit"
                                className="bg-rose-600 px-8 py-2 font-semibold rounded cursor-pointer text-white hover:bg-rose-700 mt-5"
                            >
                                {isLoading ? "deleting" : "Agree"}
                            </button>

                            <button
                                onClick={() => setDeleteModal(!openDeleteModal)}
                                type="button"
                                className="bg-blue-600 px-4 py-2 font-semibold rounded cursor-pointer text-white hover:bg-secondary mt-5"
                            >
                                No, cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
