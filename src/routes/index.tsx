import { createHashRouter } from "react-router-dom";
// Import pages
import App from "@/app/App";
import Login from "@/app/Login";
import Mainlayout from '@/app/Main/Layout'
import Home from '@/app/Main/Home'
import History from "@/app/Main/History";
import Personal from "@/app/Main/Personal";
import Settings from "@/app/Main/Settings";

const router = createHashRouter([
    {
        path: '/',
        element: <App />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/main',
        element: <Mainlayout />,
        children: [
            {
                path: '',
                element: <Home />
            },
            {
                path: 'history',
                element: <History />
            },
            {
                path: 'personal',
                element: <Personal />
            },
            {
                path: 'settings',
                element: <Settings />
            }
        ]
    }
])

export default router