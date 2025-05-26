"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/constants";
import Cookies from "js-cookie";

// Dummy user database (same as in AuthContext)
const DUMMY_USERS = {
  admin: {
    email: "admin@gmail.com",
    password: "admin123",
    token: "admin",
    name: "Admin User",
    role: "admin",
    permissions: ["all"],
  },
  carrier: {
    email: "carrier@gmail.com",
    password: "carrier123",
    token: "carrier",
    name: "Carrier Company",
    role: "carrier",
    permissions: ["shipments", "dashboard"],
  },
  driver: {
    email: "driver@example.com",
    password: "driver123",
    token: "driver",
    name: "Driver Name",
    role: "driver",
    permissions: ["deliveries"],
  },
};

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCarrier, setIsCarrier] = useState(false);
  const [isDriver, setIsDriver] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const authData = Cookies.get("auth");
      
      if (!authData) {
        setLoading(false);
        return;
      }

      try {
        const userData = JSON.parse(authData);
        setUser(userData);
        
        // Set role flags
        setIsAdmin(userData.role === "admin");
        setIsCarrier(userData.role === "carrier");
        setIsDriver(userData.role === "driver");
      } catch (error) {
        console.error("Failed to parse auth data:", error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    setAuthError(null);
    setLoading(true);
    
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Find matching user
      const userKey = Object.keys(DUMMY_USERS).find(
        (key) =>
          DUMMY_USERS[key].email === email &&
          DUMMY_USERS[key].password === password
      );

      if (!userKey) {
        throw new Error("Invalid email or password");
      }

      const userData = DUMMY_USERS[userKey];

      // Store in state and cookies
      setUser(userData);
      Cookies.set("auth", JSON.stringify(userData), { expires: 1 });

      // Set role flags
      setIsAdmin(userData.role === "admin");
      setIsCarrier(userData.role === "carrier");
      setIsDriver(userData.role === "driver");

      // Redirect based on role
      const redirectMap = {
        admin: ROUTES.ADMIN_DASHBOARD,
        carrier: ROUTES.CARRIER_DASHBOARD,
        driver: ROUTES.DRIVER_DASHBOARD,
      };
      router.push(redirectMap[userData.role] || ROUTES.DASHBOARD);

      return { success: true };
    } catch (error) {
      console.error("Login failed:", error);
      setAuthError(error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const signup = async (userData) => {
    // In a real app, this would call your API
    // For now, we'll just simulate a successful signup
    setAuthError(null);
    setLoading(true);
    
    try {
      await new Promise((resolve) => setTimeout(resolve, 100));
      
      // In a real app, you would get this data from your API response
      const newUser = {
        ...userData,
        token: `${userData.role}-token`,
        permissions: DUMMY_USERS[userData.role]?.permissions || [],
      };
      
      setUser(newUser);
      Cookies.set("auth", JSON.stringify(newUser), { expires: 1 });
      
      // Set role flags
      setIsAdmin(newUser.role === "admin");
      setIsCarrier(newUser.role === "carrier");
      setIsDriver(newUser.role === "driver");

      router.push(ROUTES.DASHBOARD);
      return { success: true };
    } catch (error) {
      console.error("Signup failed:", error);
      setAuthError(error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    Cookies.remove("auth");
    setUser(null);
    setIsAdmin(false);
    setIsCarrier(false);
    setIsDriver(false);
    router.push(ROUTES.LOGIN);
  };

  return { 
    user, 
    loading, 
    authError, 
    isAdmin, 
    isCarrier, 
    isDriver, 
    login, 
    signup, 
    logout 
  };
};