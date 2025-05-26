"use client";
import { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

// Create context
const AuthContext = createContext();

// Dummy user database
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

export function AuthProvider({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [isAdminExist, setIsAdminExist] = useState(false);
  const [isCourierExist, setIsCourierExist] = useState(false);
  const [isDriverExist, setIsDriverExist] = useState(false);

  // Initialize from cookies if available
  const initializeAuth = () => {
    const authData = Cookies.get("auth");
    if (authData) {
      const parsedUser = JSON.parse(authData);
      setUser(parsedUser);

      // Set role-based flags
      const role = parsedUser.role;
      setIsAdminExist(role === "admin");
      setIsCourierExist(role === "carrier");
      setIsDriverExist(role === "driver");
    }
  };

  const setRoleFlags = ({ isAdminExist, isCourierExist, isDriverExist }) => {
    setIsAdminExist(isAdminExist);
    setIsCourierExist(isCourierExist);
    setIsDriverExist(isDriverExist);
  };

  const login = async (email, password) => {
    setIsLoading(true);
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

      // Set role-based flags
      const role = userData.role;
      setIsAdminExist(role === "admin");
      setIsCourierExist(role === "carrier");
      setIsDriverExist(role === "driver");

      // Redirect based on role
      const redirectMap = {
        admin: "/admin",
        carrier: "/carrier",
        driver: "/driver",
      };
      router.push(redirectMap[role] || "/");

      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAdminExist(false);
    setIsCourierExist(false);
    setIsDriverExist(false);
    Cookies.remove("auth");
    router.push("/auth/login");
  };

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    initializeAuth,
    isAdminExist,
    isCourierExist,
    isDriverExist,
    setRoleFlags,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
