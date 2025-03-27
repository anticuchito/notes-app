// src/hooks/useAuth.ts
import { useEffect } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { verifyToken } from '@/features/auth/authSlice';

export const useAuth = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(verifyToken());
  }, [dispatch]);
};
