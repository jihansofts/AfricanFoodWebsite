"use client";
import { useSession, signOut } from "next-auth/react";
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
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (user: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      const { id, name, email, role, image, whatsappNumber } =
        session.user as User;

      const u = { id, name, email, role, image, whatsappNumber };
      setUser(u);
      localStorage.setItem("user", JSON.stringify(u));

      // ✅ Trigger WhatsApp modal only for vendors without number
      if (role === "vendor" && !whatsappNumber) setShowModal(true);
    } else if (status === "unauthenticated") {
      setUser(null);
      setShowModal(false);
    } else {
      const storedUser = localStorage.getItem("user");
      if (storedUser) setUser(JSON.parse(storedUser));
      setShowModal(false);
    }
  }, [session, status]);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    signOut();
  };

  const handleSaved = (newNumber: string) => {
    if (user) {
      const updated = { ...user, whatsappNumber: newNumber };
      setUser(updated);
      localStorage.setItem("user", JSON.stringify(updated));
    }
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
      {user?.id && (
        <WhatsappModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
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
