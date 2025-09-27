'use client';
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/context/auth';

export default function PublicRoute({ children }) {
  const { isLoggedIn } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.replace('/dashboard');
    }
  }, [isLoggedIn, router]);

  if (isLoggedIn) return null;

  return children;
}