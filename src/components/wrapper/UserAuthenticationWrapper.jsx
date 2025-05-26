'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import FullScreenLoader from '@/components/common/loader/FullScreenLoader';

function UserAuthenticationWrapper({ children }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get('token');
    
    if (!token) {
      router.push('auth/login'); 
    } else {
      setIsLoading(false); 
    }
  }, [router]);

  if (isLoading) {
    return <FullScreenLoader />;
  }

  return children;
}

export default UserAuthenticationWrapper;