"use client";
import Container from "@/app/components/Container";
import Heading from "@/app/components/Heading";
import ListingCard from "@/app/components/ListingCard";
import { SafeListing, SafeUser } from "@/app/types";
import { useRouter } from "next/navigation";

interface FavoriteClientProps {
  listings: SafeListing[] | null;
  currentUser?: SafeUser | null;
}
const FavoriteClient: React.FC<FavoriteClientProps> = ({
  listings,
  currentUser,
}) => {
  const router = useRouter();

  return (
    <Container>
      <Heading
        title="Favorites"
        subTitle="List of places you have favorited!"
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings?.map((listing) => (
          <ListingCard
            key={listing.id}
            data={listing}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default FavoriteClient;
