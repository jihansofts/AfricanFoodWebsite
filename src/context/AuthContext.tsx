"use client";
import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";

import WhatsappModal from "@/common/WhatsappModal";

type User = {
  id?: string;
  name: string;
  email: string;
  role: string;
  image?: string;
  whatsappNumber?: string;
  productLimit?: number;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  requiresWhatsApp: boolean; // Add this
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [whatsappNumber, setWhatsappNumber] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [requiresWhatsApp, setRequiresWhatsApp] = useState(false); // Add this

  // fetch user data
  const getUserData = async (userId: string) => {
    try {
      const response = await fetch(`/api/users?id=${userId}`);
      const data = await response.json();
      if (data?.user) {
        setWhatsappNumber(data.user.whatsappNumber);
        // Update requiresWhatsApp based on actual data
        if (data.user.role === "vendor" && !data.user.whatsappNumber) {
          setRequiresWhatsApp(true);
        }
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  // 🧩 Load user from localStorage on first render
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      if (parsedUser.role === "vendor") {
        getUserData(parsedUser.id!);
      }

      // Show WhatsApp modal if vendor missing number
      if (parsedUser.role === "vendor" && !parsedUser.whatsappNumber) {
        setShowModal(true);
        setRequiresWhatsApp(true); // Set requirement
      }
    }
    setLoading(false);
  }, []);

  // ✅ Manual login (after JWT login)
  const login = (userData: User, token: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("role", userData.role);
    setUser(userData);

    if (userData.role === "vendor" && !userData.whatsappNumber) {
      setShowModal(true);
      setRequiresWhatsApp(true); // Set requirement
    } else {
      setShowModal(false);
      setRequiresWhatsApp(false); // Clear requirement
    }
  };

  // ✅ Logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    setUser(null);
    setShowModal(false);
    setRequiresWhatsApp(false); // Clear requirement
    window.location.href = "/";
  };

  // ✅ Update after WhatsApp number saved
  const handleSaved = (newNumber: string) => {
    if (user) {
      const updated = { ...user, whatsappNumber: newNumber };
      setUser(updated);
      localStorage.setItem("user", JSON.stringify(updated));
      setShowModal(false);
      setRequiresWhatsApp(false); // Clear requirement after saving
    }
  };

  // ✅ Handle modal close without saving
  const handleModalClose = () => {
    setShowModal(false);
    // Keep requiresWhatsApp as true until number is provided
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
        requiresWhatsApp,
      }}
    >
      {children}
      {user?.role === "vendor" && requiresWhatsApp && (
        <WhatsappModal
          isOpen={showModal}
          onClose={handleModalClose} // Use the new handler
          userId={user.id!}
          onSaved={handleSaved}
        />
      )}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
