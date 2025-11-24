import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const activities = await prisma.activity.findMany({
    where: {
      userId: user.id,
      date: {
        gte: today,
        lt: tomorrow
      }
    }
  });

  return NextResponse.json({ activities });
}
