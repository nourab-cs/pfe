import { useUser } from "../../stores/userStore"

import { Navigate } from "react-router-dom";

export function Public({ children }) {
    const [user] = useUser((state) => [state.user]);



    return (
        <>{!user._id ? children : <Navigate to="/" />}</>
    );
}