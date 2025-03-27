import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import { selectIsAuthenticated, verifyToken } from '../features/auth/authSlice';
import { AppDispatch } from '@/store/store';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

interface PrivateRouteProps {
  children?: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(verifyToken());
  }, [dispatch]);
  // Verifica si el usuario está autenticado
  const token = localStorage.getItem('token');
  console.log(token);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  console.log(isAuthenticated);

  if (!token) {
    // Redirige al login si el usuario no está autenticado
    return <Navigate to='/auth' replace />;
  }

  // Si hay children los renderiza, sino renderiza el Outlet
  return children ? <>{children}</> : <Outlet />;
};

export default PrivateRoute;
