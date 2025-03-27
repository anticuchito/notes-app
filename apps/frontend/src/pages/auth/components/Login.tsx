import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Icons from '@/components/icons';
import type { Credentials } from '@/types/auth';
interface props {
  isLoading: boolean;
  onSubmit: (credentials: Credentials) => void;
}

const Login = ({ isLoading, onSubmit }: props) => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(credentials);
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <div className='space-y-2'>
        <Label htmlFor='email'>Email</Label>
        <Input id='email' type='email' required onChange={handleChange} />
      </div>
      <div className='space-y-2'>
        <div className='flex items-center justify-between'>
          <Label htmlFor='password'>Password</Label>
          <a href='#' className='text-sm text-primary hover:underline'>
            Forgot password?
          </a>
        </div>
        <Input id='password' type='password' required onChange={handleChange} />
      </div>
      <Button
        variant='darker'
        type='submit'
        className='w-full'
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
            Logging in...
          </>
        ) : (
          'Login'
        )}
      </Button>
    </form>
  );
};

export default Login;
