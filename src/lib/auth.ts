import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { prisma } from "./db";

const COOKIE_NAME = "hellocoder_token";

export function signJwt(payload: object) {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET not configured");
  return jwt.sign(payload, secret, { expiresIn: "1d" });
}

export function verifyJwt(token: string) {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET not configured");
  try {
    return jwt.verify(token, secret) as unknown as { sub: number; email: string };
  } catch {
    return null;
  }
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;

  const payload = verifyJwt(token);
  if (!payload) return null;

  return prisma.user.findUnique({
    where: { id: payload.sub }
  });
}

export async function setAuthCookie(token: string) {
  const cookieStore = cookies();
  (await cookieStore).set({
    name: COOKIE_NAME,
    value: token,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 // 1 dia
  });
}

export async function clearAuthCookie() {
  const cookieStore = cookies();
  (await cookieStore).set({
    name: COOKIE_NAME,
    value: "",
    path: "/",
    maxAge: 0
  });
}
