import App from "@/app/App";
import Login from "@/app/Login";
import { createHashRouter } from "react-router-dom";

const router = createHashRouter([
    {
        path: '/',
        element: <App />
    },
    {
        path: '/login',
        element: <Login />
    }
])

export default router