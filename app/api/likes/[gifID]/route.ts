import prisma from "@/lib/prisma";

export type Params = Record<"params", { gifID: string }>;

const USER_ID = process.env.USER_ID;

export async function GET(_: Request, { params }: Params) {
  const data = await prisma.likes.findMany({ where: { gif_id: params.gifID } });
  return Response.json({ data });
}

export async function POST(_: Request, { params }: Params) {
  if (!USER_ID) {
    throw new Error("`USER_ID` env variable is missing.");
  }
  const existingLike = await prisma.likes.findFirst({
    where: { user_id: USER_ID, gif_id: params.gifID },
  });
  if (existingLike) {
    const data = await prisma.likes.delete({
      where: { id: existingLike.id },
    });
    return Response.json({ data, isAdded: false });
  }
  const data = await prisma.likes.create({
    data: { user_id: USER_ID, gif_id: params.gifID },
  });
  return Response.json({ data, isAdded: true });
}
