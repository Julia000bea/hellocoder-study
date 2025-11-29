import { setAuthCookie } from "@/lib/auth";
import { hashPassword } from "@/lib/hash";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";



export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Dados incompletos" },
        { status: 400 }
      );
    }

    const existing = await prisma.user.findUnique({
      where: { email },
    });

    if (existing) {
      return NextResponse.json(
        { error: "E-mail já está registrado" },
        { status: 400 }
      );
    }

    const hashed = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashed,
      },
    });

    // salva cookie jwt httpOnly
    await setAuthCookie(user.id);

    return NextResponse.json(
      { ok: true, user: { id: user.id, name: user.name, email: user.email } },
      { status: 200 }
    );

  } catch (err) {
    console.error("REGISTER ERROR:", err);
    return NextResponse.json(
      { error: "Erro interno ao registrar" },
      { status: 500 }
    );
  }
}
