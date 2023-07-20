/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Jumbotron from "../../../components/shared/Jumbotron/Jumbotron";
import { useParams } from "react-router-dom";
import { useSingleBookQuery } from "../../../redux/features/books/bookApi";
import BookDetail from "./BookDetail";
import BookReviews from "./BookReviews";
import { useEffect } from "react";

const BookDetails = () => {
    const param = useParams();
    const { data } = useSingleBookQuery(param?.id as string);
    
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, []);

    return (
        <>
            <Jumbotron name={`The Book of ${data?.data?.title}`} />
            <BookDetail data={data?.data} />
            <BookReviews bookData={data?.data} />
        </>
    );
};

export default BookDetails;
