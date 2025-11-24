import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { hashPassword } from "@/lib/hash";

export async function POST(request: Request) {
  const { email, username, password } = await request.json();

  if (!email || !username || !password) {
    return NextResponse.json(
      { error: "Dados incompletos" },
      { status: 400 }
    );
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json(
      { error: "E-mail já registrado" },
      { status: 400 }
    );
  }

  const hashed = await hashPassword(password);

  await prisma.user.create({
    data: {
      email,
      username,
      password: hashed
    }
  });

  return NextResponse.json({ ok: true });
}
