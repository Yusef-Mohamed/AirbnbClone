import getCurrentUser from "../actions/getCurrentUser";
import getReservation from "../actions/getReservations";
import EmptyState from "../components/EmptyState";
import ReservationClient from "./components/ReservationClient";

const ReservationsPage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }
  const reservations = await getReservation({ authorId: currentUser.id });
  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No reservations found"
        subtitle="Looks like you have no reservations on your properties"
      />
    );
  }
  return (
    <ReservationClient reservations={reservations} currentUser={currentUser} />
  );
};

export default ReservationsPage;
