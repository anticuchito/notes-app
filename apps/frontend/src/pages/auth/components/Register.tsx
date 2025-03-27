import type React from 'react';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import Icons from '@/components/icons';
import { FormCreateAccount } from '@/types/auth';

interface props {
  isLoading: boolean;
  onSubmit: (formCreateAccount: FormCreateAccount) => void;
}

const Register = ({ isLoading, onSubmit }: props) => {
  const [formCreateAccount, setFormCreateAccount] = useState<FormCreateAccount>(
    {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    }
  );
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormCreateAccount({
      ...formCreateAccount,
      [e.target.id]: e.target.value,
    });
  };
  async function HandleSubmit(event: React.FormEvent) {
    event.preventDefault();
    onSubmit(formCreateAccount);
  }

  return (
    <form onSubmit={HandleSubmit} className='space-y-4'>
      <div className='space-y-2'>
        <Label htmlFor='name'>Name</Label>
        <Input
          id='name'
          placeholder='John Doe'
          required
          onChange={handleChange}
        />
      </div>
      <div className='space-y-2'>
        <Label htmlFor='email'>Email</Label>
        <Input
          id='email'
          placeholder='name@example.com'
          type='email'
          required
          onChange={handleChange}
        />
      </div>
      <div className='space-y-2'>
        <Label htmlFor='password'>Password</Label>
        <Input id='password' type='password' required onChange={handleChange} />
      </div>
      <div className='space-y-2'>
        <Label htmlFor='confirm-password'>Confirm Password</Label>
        <Input
          id='confirmPassword'
          type='password'
          required
          onChange={handleChange}
        />
      </div>
      <Button type='submit' className='w-full' disabled={isLoading}>
        {isLoading ? (
          <>
            <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
            Creating account...
          </>
        ) : (
          'Create Account'
        )}
      </Button>
    </form>
  );
};

export default Register;
