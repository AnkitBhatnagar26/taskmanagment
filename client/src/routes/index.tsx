import { useRoutes } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';

export default function Router() {
  return useRoutes([MainRoutes, AuthenticationRoutes]);
}
