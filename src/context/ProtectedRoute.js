import { Navigate } from "react-router-dom";
import { isValidText } from "../utils/helpers";

export const ProtectedRoute = ({ children }) => {
    let isAuth = localStorage.getItem('user');
    if(isValidText(isAuth) == false) {
        return <Navigate to="/" />;
    }
    return children;
};