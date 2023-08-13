"use client";
import Container from "@/app/components/Container";
import Heading from "@/app/components/Heading";
import ListingCard from "@/app/components/ListingCard";
import { SafeReservations, SafeUser } from "@/app/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";

interface ReservationClientProps {
  reservations: SafeReservations[];
  currentUser?: SafeUser | null;
}
const ReservationClient: React.FC<ReservationClientProps> = ({
  reservations,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");
  const onCancel = useCallback(
    (id: string) => {
      console.log(0);
      setDeletingId(id);
      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("The trip has been deleted");
          router.refresh();
        })
        .catch((err) => {
          toast.error(err?.response?.data?.error);
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );
  return (
    <Container>
      <Heading title="Reservations" subTitle="Bookings on your properties" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations.map((reservation) => (
          <ListingCard
            reservation={reservation}
            key={reservation.id}
            data={reservation.listing}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default ReservationClient;
