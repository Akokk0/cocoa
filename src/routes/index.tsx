import { createHashRouter } from "react-router-dom";
// Import pages
import App from "@/app/app";
import Login from "@/app/login";
import Mainlayout from '@/app/main/layout'
import Home from '@/app/main/home'
import History from "@/app/main/history";
import Personal from "@/app/main/personal";
import Settings from "@/app/main/settings";
import Dynamic from "@/app/main/dynamic";
import Favorite from "@/app/main/favorite";
import ToView from "@/app/main/toview";
import Player from "@/app/player";
import PGCPlayer from "@/app/pgcplayer";

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
                path: 'dynamic',
                element: <Dynamic />
            },
            {
                path: 'favorite',
                element: <Favorite />
            },
            {
                path: 'history',
                element: <History />
            },
            {
                path: 'toview',
                element: <ToView />
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
    },
    {
        path: '/player/:bvid/:cid',
        element: <Player />
    },
    {
        path: '/pgcplayer/:ep_id',
        element: <PGCPlayer />
    }
])

export default router