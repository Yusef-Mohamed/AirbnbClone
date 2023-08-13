import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
interface IParams {
  listingId?: string;
}
export async function POST(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }
  const { listingId } = params;
  if (!listingId || typeof listingId !== "string") {
    return NextResponse.error();
  }

  let favortieIds = [...(currentUser.favoriteIds || [])];
  favortieIds.push(listingId);
  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds: favortieIds,
    },
  });
  return NextResponse.json(user);
}
export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }
  const { listingId } = params;
  if (!listingId || typeof listingId !== "string") {
    return NextResponse.error();
  }

  let favortieIds = [...(currentUser.favoriteIds || [])];
  favortieIds = favortieIds.filter((id) => id !== listingId);
  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds: favortieIds,
    },
  });
  return NextResponse.json(user);
}
