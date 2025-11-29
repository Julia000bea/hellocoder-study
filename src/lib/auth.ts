import { SignJWT, jwtVerify, type JWTPayload } from "jose";
import { cookies } from "next/headers";
import { prisma } from "./prisma";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

// -------------------------
// JWT
// -------------------------
export async function generateJwt(payload: JWTPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(SECRET);
}

export async function verifyJwt(token: string) {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload as JWTPayload & { userId: number };
  } catch {
    return null;
  }
}

// -------------------------
// COOKIES
// -------------------------
export async function setAuthCookie(userId: number) {
  const token = await generateJwt({ userId });

  const cookieStore = await cookies();
  cookieStore.set({
    name: "token",
    value: token,
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7, // 7 dias
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
}

export async function clearAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.delete("token");
}

// -------------------------
// CURRENT USER
// -------------------------
export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  const decoded = await verifyJwt(token);
  if (!decoded || !decoded.userId) return null;

  return await prisma.user.findUnique({
    where: { id: decoded.userId },
  });
}
