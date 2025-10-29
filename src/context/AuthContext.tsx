// context/AuthContext.tsx
"use client";

import { useSession, signOut } from "next-auth/react";
import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";

type User = {
  name: string;
  email: string;
  role: string;
  image?: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (user: User) => void;
  logout: () => void;
};

// Create context with default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);

  // Keep context user synced with NextAuth session
  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      const { name, email, role, image } = session.user as User;
      setUser({ name, email, role, image });
      localStorage.setItem(
        "user",
        JSON.stringify({ name, email, role, image })
      );
    } else if (status === "unauthenticated") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }
    }
  }, [session, status]);

  const login = (userData: User) => {
    setUser(userData);
    // persist user in localStorage
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    signOut(); // calls NextAuth signOut()
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading: status === "loading",
      }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
