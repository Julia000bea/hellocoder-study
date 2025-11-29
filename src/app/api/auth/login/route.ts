
import { setAuthCookie } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";


export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user)
      return new Response("User not found", { status: 404 });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid)
      return new Response("Invalid credentials", { status: 400 });

    await setAuthCookie(user.id);

    return Response.json({ user });
  } catch {
    return new Response("Error logging in", { status: 500 });
  }
}
