import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return new Response("Unauthorized", { status: 401 });

  const sessions = await prisma.pomodoro.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" }  
  });

  return Response.json(sessions);
}

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) return new Response("Unauthorized", { status: 401 });

  const { focusTime, breakTime, cycles } = await req.json();

  const session = await prisma.pomodoro.create({
    data: {
      focusTime,
      breakTime,
      cycles,
      userId: user.id,
    },
  });

  return Response.json(session);
}

export async function PUT(req: Request) {
  const user = await getCurrentUser();
  if (!user) return new Response("Unauthorized", { status: 401 });

  const { id, focusTime, breakTime, cycles } = await req.json();

  const updated = await prisma.pomodoro.update({
    where: { id },
    data: { focusTime, breakTime, cycles },
  });

  return Response.json(updated);
}

export async function DELETE(req: Request) {
  const user = await getCurrentUser();
  if (!user) return new Response("Unauthorized", { status: 401 });

  const { id } = await req.json();

  await prisma.pomodoro.delete({
    where: { id },
  });

  return Response.json({ success: true });
}
