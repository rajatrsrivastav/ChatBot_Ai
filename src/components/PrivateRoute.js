'use client';
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/context/auth';

export default function PrivateRoute({ children, redirectTo = '/auth/login' }) {
  const { isLoggedIn } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn === false) {
      router.replace(redirectTo);
    }
  }, [isLoggedIn, router, redirectTo]);

  if (isLoggedIn === false) {
    return null;
  }

  return children;
}