import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/Main/Main";
import Home from "../pages/Home/Home";
import NotFound from "../pages/NotFound/NotFound";
import Register from "../pages/Auth/Register/Register";
import Login from "../pages/Auth/Login/Login";
import AddBook from "../pages/AddBook/AddBook";
import AllBooks from "../pages/AllBooks/AllBooks";
import BookDetails from "../pages/AllBooks/BookDetails";


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
                element: <AddBook />,
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
