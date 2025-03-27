import { createBrowserRouter } from 'react-router-dom';
import Home from '@/pages/home/ìndex';
import Auth from '@/pages/auth';
import PrivateRoute from './PrivateRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <PrivateRoute>
        <Home />
      </PrivateRoute>
    ),
  },
  {
    path: '/auth',
    element: <Auth />,
  },
]);
