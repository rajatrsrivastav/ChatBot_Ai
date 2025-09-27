'use client';
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/context/auth';

export default function PrivateRoute({ children}) {
  const { isLoggedIn } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn === false) {
      router.replace('/auth/login');
    }
  }, [isLoggedIn, router]);

  if (isLoggedIn === false) {
    return null;
  }

  return children;
}