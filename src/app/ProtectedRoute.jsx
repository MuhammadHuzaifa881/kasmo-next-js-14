"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getTokenCookie } from "@/lib/cookies";
import { ROUTES } from "@/lib/constants";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const token = getTokenCookie();
    if (!token) {
      router.push(ROUTES.LOGIN);
    }
  }, [router]);

  return children;
};

export default ProtectedRoute;