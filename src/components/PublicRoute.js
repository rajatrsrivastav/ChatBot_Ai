'use client';
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/context/auth';

export default function PublicRoute({ children, redirectTo = '/dashboard' }) {
  const { isLoggedIn } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn === true) {
      router.replace(redirectTo);
    }
  }, [isLoggedIn, router, redirectTo]);

  if (isLoggedIn === true) {
    return null; 
  }

  return children;
}