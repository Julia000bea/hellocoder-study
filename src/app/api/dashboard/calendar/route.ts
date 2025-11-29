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
