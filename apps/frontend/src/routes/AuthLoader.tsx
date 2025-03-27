// components/AuthLoader.tsx
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { verifyToken } from '@/features/auth/authSlice';
import { AppDispatch } from '@/store/store';

export const AuthLoader = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(verifyToken());
  }, [dispatch]);

  return <>{children}</>;
};
