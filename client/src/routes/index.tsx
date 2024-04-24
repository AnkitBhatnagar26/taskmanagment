import { useRoutes } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import { useAppSelector } from '../store/redux/hooks';
import { selectAuthToken } from '../store/redux/authSlice';

export default function Router() {
  const isAuthenticated = useAppSelector(selectAuthToken).auth_token;
  // Define routes based on authentication status
  const routes = isAuthenticated ? [MainRoutes, AuthenticationRoutes] : [AuthenticationRoutes];
  return useRoutes(routes);
}
