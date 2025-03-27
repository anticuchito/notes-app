'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  loginUser,
  registerUser,
  //   selectAuthError,
  selectIsLoading,
} from '../../features/auth/authSlice';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Login from './components/Login';
import Register from './components/Register';
import { useNavigate } from 'react-router-dom';
import type { Credentials, FormCreateAccount } from '@/types/auth';

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState('login');

  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsLoading);
  const navigate = useNavigate();
  //   const error = useAppSelector(selectAuthError); ->FIXME handle error
  const handleLogin = async (credentials: Credentials) => {
    console.log(credentials);
    const resultAction = await dispatch(loginUser(credentials));
    console.log(resultAction);

    if (loginUser.fulfilled.match(resultAction)) {
      navigate('/');
    }
  };

  const handleRegister = async (formCreateAccount: FormCreateAccount) => {
    console.log(formCreateAccount);
    const resultAction = await dispatch(registerUser(formCreateAccount));
    console.log(resultAction);

    if (registerUser.fulfilled.match(resultAction)) {
      navigate('/');
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-background p-4'>
      <Card className='w-full max-w-md'>
        <CardHeader className='space-y-1'>
          <CardTitle className='text-2xl font-bold text-center'>
            {activeTab === 'login' ? 'Welcome back' : 'Create an account'}
          </CardTitle>
          <CardDescription className='text-center'>
            {activeTab === 'login'
              ? 'Enter your credentials to sign in to your account'
              : 'Enter your information to create an account'}
          </CardDescription>
        </CardHeader>
        <Tabs value={activeTab} onValueChange={setActiveTab} className='w-full'>
          <TabsList className='grid grid-cols-2 w-full'>
            <TabsTrigger value='login'>Login</TabsTrigger>
            <TabsTrigger value='register'>Register</TabsTrigger>
          </TabsList>
          <CardContent className='p-6'>
            <TabsContent value='login' className='mt-0'>
              <Login isLoading={isLoading} onSubmit={handleLogin} />
            </TabsContent>
            <TabsContent value='register' className='mt-0'>
              <Register isLoading={isLoading} onSubmit={handleRegister} />
            </TabsContent>
          </CardContent>
        </Tabs>
        <CardFooter className='flex justify-center border-t p-6'>
          <p className='text-sm text-muted-foreground'>
            {activeTab === 'login'
              ? "Don't have an account? Switch to Register"
              : 'Already have an account? Switch to Login'}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
