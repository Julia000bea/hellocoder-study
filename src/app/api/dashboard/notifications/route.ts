import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return new Response("Unauthorized", { status: 401 });

  const notifications = await prisma.notification.findMany({
    where: { userId: user.id },
  });

  return Response.json(notifications);
}

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) return new Response("Unauthorized", { status: 401 });

  const { message } = await req.json();

  const notif = await prisma.notification.create({
    data: { message, userId: user.id },
  });

  return Response.json(notif);
}
