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
  productLimit?: number;
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

  // 🧩 Load user from localStorage immediately (even before NextAuth session loads)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser && !user) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      const storedUser = localStorage.getItem("user");
      const existingUser = storedUser ? JSON.parse(storedUser) : {};

      const { id, name, email, role, image, whatsappNumber, productLimit } =
        session.user as User;

      // 🧠 Merge local + session data (local has priority for WhatsApp number)
      const mergedUser = {
        ...existingUser,
        id,
        name,
        email,
        role,
        image,
        whatsappNumber: existingUser.whatsappNumber || whatsappNumber || "",
        productLimit: existingUser.productLimit || productLimit || 3,
      };

      setUser(mergedUser);

      localStorage.setItem("user", JSON.stringify(mergedUser));

      // ✅ Show WhatsApp modal only for vendors without number
      if (mergedUser.role === "vendor" && !mergedUser.whatsappNumber) {
        setShowModal(true);
      } else {
        setShowModal(false);
      }
    }
    // 🩵 FIX: When session is unauthenticated, keep local login alive
    else if (status === "unauthenticated") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
        if (parsed.role === "vendor" && !parsed.whatsappNumber) {
          setShowModal(true);
        } else {
          setShowModal(false);
        }
      } else {
        setUser(null);
        setShowModal(false);
      }
    }
  }, [session, status]);

  // ✅ Manual login (from API / form)
  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));

    if (userData.role === "vendor" && !userData.whatsappNumber) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  };

  // ✅ Logout clears both systems
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    signOut({ redirect: true, callbackUrl: "/" });
  };

  // ✅ After saving WhatsApp number
  const handleSaved = (newNumber: string) => {
    if (user) {
      const updated = { ...user, whatsappNumber: newNumber };
      setUser(updated);
      localStorage.setItem("user", JSON.stringify(updated));
      setShowModal(false);
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
      {user?.role === "vendor" && (
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
