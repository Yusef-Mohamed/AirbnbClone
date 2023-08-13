import { Listing, Reservation, User } from "@prisma/client";

export type SafeUser = Omit<
  User,
  "emailVerified" | "updatedAt" | "createdAt"
> & {
  emailVerified: string | null;
  updatedAt: string;
  createdAt: string;
};
export type SafeReservations = Omit<
  Reservation,
  "createdAt" | "endDate" | "startDate" | "listing"
> & {
  createdAt: string;
  endDate: string;
  startDate: string;
  listing: SafeListing;
};
export type SafeListing = Omit<Listing, "createdAt"> & {
  createdAt: string;
};
