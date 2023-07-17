import Jumbotron from "../../components/shared/Jumbotron/Jumbotron";
import RecentBooks from "./RecentBooks";

const Home = () => {
    return (
        <>
            {/* Banner Section */}
            <Jumbotron name="Arabic Kitab Library" />
            <RecentBooks/>
        </>

    );
};

export default Home;