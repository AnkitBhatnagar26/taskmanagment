import { Navigate } from 'react-router-dom';

import SimpleLayout from '../layouts/simple';

import LoginPage from "../pages/LoginPage"
import Page404 from '../pages/Page404';
import ErrorPage from '../pages/ErrorPage';


const AuthenticationRoutes = {
    path: '/',
    element: <SimpleLayout />,
    children: [
        { element: <Navigate to="/login" />, index: true },
        { path: 'login', element: <LoginPage /> },
        { path: 'error', element: <ErrorPage><LoginPage /></ErrorPage>},
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
    ]
};


export default AuthenticationRoutes;