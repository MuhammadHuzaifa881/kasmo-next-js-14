// app/actions.js
'use server';

import { cookies } from 'next/headers';

export async function setTokenCookie(token) {
  cookies().set('auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  });
}

export const removeTokenCookie = () => {
  // your implementation to remove cookie
  cookies().delete('token');
};
export function getTokenCookie() {
  if (typeof document !== 'undefined') {
    // Client-side
    const value = `; ${document.cookie}`;
    const parts = value.split(`; token=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }
  return null;
}
