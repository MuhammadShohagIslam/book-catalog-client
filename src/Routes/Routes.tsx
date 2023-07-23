import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/Main/Main";
import Home from "../pages/Home/Home";
import NotFound from "../pages/NotFound/NotFound";
import Register from "../pages/Auth/Register/Register";
import Login from "../pages/Auth/Login/Login";
import AddBook from "../pages/AddBook/AddBook";
import AllBooks from "../pages/AllBooks/AllBooks";
import BookDetails from "../pages/AllBooks/BookDetails";
import PrivateRouter from "./PrivateRoute";
import UpdateBook from "../pages/AllBooks/UpdateBook/UpdateBook";
import WishList from "../pages/WishList/WishList";
import ReadSoon from "../pages/ReadSoon/ReadSoon";
import CompleteReadBook from "../pages/CompleteReadBook/CompleteReadBook";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/all-books",
                element: <AllBooks />,
            },
            {
                path: "/books/:id",
                element: <BookDetails />,
            },
            {
                path: "/add-book",
                element: (
                    <PrivateRouter>
                        <AddBook />
                    </PrivateRouter>
                ),
            },
            {
                path: "/update-book",
                element: (
                    <PrivateRouter>
                        <UpdateBook />
                    </PrivateRouter>
                ),
            },
            {
                path: "/user-wish-list",
                element: (
                    <PrivateRouter>
                        <WishList />
                    </PrivateRouter>
                ),
            },
            {
                path: "/user-read-soon",
                element: (
                    <PrivateRouter>
                        <ReadSoon />
                    </PrivateRouter>
                ),
            },
            {
                path: "/user-read-complete-book",
                element: (
                    <PrivateRouter>
                        <CompleteReadBook />
                    </PrivateRouter>
                ),
            },
        ],
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);

export default router;
