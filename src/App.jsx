
import './App.css'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AnthLayout from './Lyouts/AnthLayout';
import LoginPage from './Pages/loginPage';
import RegisterPage from './Pages/registerPage';
import MainLayout from './Lyouts/MainLayout';
import FeedPage from './Pages/FeedPage';
import NotFoundPage from './Pages/NotFoundPage';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import ProtectedAuth from './ProtectedRoute/ProtectedAuth';

export default function App() {

    const router = createBrowserRouter([
        {
            path: "", element: <AnthLayout />, children: ([
                { path: "login", element: <ProtectedAuth><LoginPage /></ProtectedAuth> },
                { path: "register", element: <ProtectedAuth> <RegisterPage /></ProtectedAuth> },
            ])
        },
        {
            path: "", element: <MainLayout />, children: ([
                { index: true, element: <ProtectedRoute><FeedPage /></ProtectedRoute> },
                { path: "*", element: <NotFoundPage /> }
            ])
        }
    ])





    return (
        <>

            <RouterProvider router={router} />
        </>
    )
}
