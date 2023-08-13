import getCurrentUser from "../actions/getCurrentUser";
import getFavoriteListings from "../actions/getFavoriteListings";
import EmptyState from "../components/EmptyState";
import FavoriteClient from "./components/FavoriteClient";

const FavoritePage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }
  const listings = await getFavoriteListings();
  if (listings?.length === 0 && !listings) {
    return (
      <EmptyState
        title="No favorites found"
        subtitle="Looks like you have no favorite listing"
      />
    );
  }
  return <FavoriteClient listings={listings} currentUser={currentUser} />;
};

export default FavoritePage;
