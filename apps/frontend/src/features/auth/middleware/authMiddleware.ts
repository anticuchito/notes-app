import { Middleware } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';
import { logout } from '@/features/auth/authSlice';
import { verifyToken } from '@/features/auth/authSlice';

const authMiddleware: Middleware<object, RootState> =
  (store) => (next) => async (action) => {
    console.log('Middleware auth');
    try {
      verifyToken();
    } catch (error) {
      console.error('Error al verificar token:', error);
      store.dispatch(logout());
    }

    return next(action);
  };

export default authMiddleware;
