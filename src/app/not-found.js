'use client';
import React, { useEffect } from 'react';
import Link from 'next/link';
import './not-found.css';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();


  return (
    <div className="notfound-container">
      <p className="notfound-code">404</p>
      <h1 className="notfound-title">Page Not Found</h1>
      <p className="notfound-message">
        The page you are looking for doesn&#39;t exist or was moved. You&#39;ll be redirected to your dashboard shortly.
      </p>
      <div className="notfound-actions">
        <Link href="/dashboard" className="notfound-button-primary">Go to Dashboard</Link>
        <Link href="/" className="notfound-button-secondary">Back Home</Link>
      </div>
    </div>
  );
}
