import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/hook";
import { ReactNode } from "react";

type PrivateRouterPropType = {
    children: ReactNode;
};

const PrivateRouter = ({ children }: PrivateRouterPropType) => {
    const user = useAppSelector((state) => state.local.user.user);
    const location = useLocation();

    if (user?.email || user?.role) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace={true} />;
};

export default PrivateRouter;
