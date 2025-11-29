import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return new Response("Unauthorized", { status: 401 });

  const activities = await prisma.activity.findMany({
    where: { userId: user.id },
  });

  return Response.json(activities);
}

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) return new Response("Unauthorized", { status: 401 });

  const { title } = await req.json();

  const activity = await prisma.activity.create({
    data: { title, userId: user.id },
  });

  return Response.json(activity);
}
