import { useEffect } from "react";
import Jumbotron from "../../components/shared/Jumbotron/Jumbotron";
import RecentBooks from "./RecentBooks";

const Home = () => {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, []);
    return (
        <>
            {/* Banner Section */}
            <Jumbotron name="Arabic Kitab Library" />
            <RecentBooks/>
        </>

    );
};

export default Home;