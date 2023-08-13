"use client";
import Container from "@/app/components/Container";
import Heading from "@/app/components/Heading";
import ListingCard from "@/app/components/ListingCard";
import { SafeListing, SafeReservations, SafeUser } from "@/app/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";

interface PropertiesClientProps {
  listings: SafeListing[] | null;
  currentUser?: SafeUser | null;
}
const PropertiesClient: React.FC<PropertiesClientProps> = ({
  listings,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");
  const onCancel = useCallback(
    (id: string) => {
      console.log(0);
      setDeletingId(id);
      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success("Listing deleted");
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
      <Heading title="Properties" subTitle="List of your properties" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings?.map((listings) => (
          <ListingCard
            key={listings.id}
            data={listings}
            actionId={listings.id}
            onAction={onCancel}
            disabled={deletingId === listings.id}
            actionLabel="Delete Property"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default PropertiesClient;
