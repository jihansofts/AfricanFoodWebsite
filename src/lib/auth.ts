import jwt from "jsonwebtoken";

export const verifyToken = (token?: string) => {
  try {
    if (!token) return null;
    const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET!);
    return decoded;
  } catch {
    return null;
  }
};
