import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";


export async function GET() {
  const user = await getCurrentUser();
  if (!user) return new Response("Unauthorized", { status: 401 });

  const reviews = await prisma.review.findMany({
    where: { userId: user.id },
  });

  return Response.json(reviews);
}

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) return new Response("Unauthorized", { status: 401 });

  const { content, rating } = await req.json();

  const review = await prisma.review.create({
    data: { content, rating, userId: user.id },
  });

  return Response.json(review);
}
