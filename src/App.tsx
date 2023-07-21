/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import router from "./Routes/Routes";

function App() {
    return (
        <>
            <Toaster position="top-center" reverseOrder={false} />
            <RouterProvider router={router}></RouterProvider>
        </>
    );
}

export default App;
