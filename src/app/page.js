'use client';
import { useEffect } from 'react';
import { redirect } from 'next/navigation';
import PageLoader from '@/components/common/loader/PageLoader';
import Cookies from 'js-cookie';
import { useAuth } from '@/hooks/useAuth';

export default function Home() {
  const {
    isLoading,
    isAuthenticated,
    user,
    setRoleFlags,
  } = useAuth();



  useEffect(() => {
    if (user) {
      const role = user.role;

      // Set role flags in context
      setRoleFlags({
        isAdminExist: role === 'admin',
        isCourierExist: role === 'carrier',
        isDriverExist: role === 'driver',
      });

      // Redirect based on role
      const redirectMap = {
        admin: '/admin',
        carrier: '/carrier',
        driver: '/driver',
      };

      redirect(redirectMap[role] || '/');
    } else {
      const token = Cookies.get('auth');
      if (!token) redirect('auth/login');
    }
  }, [user]);

  if (isLoading) return <PageLoader />;

  return null;
}
