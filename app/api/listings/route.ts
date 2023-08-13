import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { useId } from "react";
export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }
  const body = await request.json();
  const {
    category,
    location,
    guestCount,
    roomCount,
    bathroomCount,
    imageSrc,
    price,
    title,
    description,
  } = body;
  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });
  const listing = await prisma.listing.create({
    data: {
      title: title,
      description: description,
      imageSrc: imageSrc,
      category: category,
      roomCount: roomCount,
      guestCount: guestCount,
      bathroomCount: bathroomCount,
      price: parseInt(price, 10),
      locationValue: location.value,
      userId: currentUser.id,
    },
  });
  return NextResponse.json(listing);
}
