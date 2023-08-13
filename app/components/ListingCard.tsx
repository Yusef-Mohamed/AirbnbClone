"use client";
import { SafeListing, SafeReservations, SafeUser } from "../types";
import { useRouter } from "next/navigation";
import useCountries from "../hooks/useCountries";
import { useCallback, useMemo } from "react";
import { format } from "date-fns";
import Image from "next/image";
import HeartButtons from "./HeartButton";
import Button from "./Button";
interface ListingCardProps {
  data: SafeListing;
  currentUser: SafeUser | null | undefined;
  reservation?: SafeReservations;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
}
const ListingCard: React.FC<ListingCardProps> = ({
  data,
  currentUser,
  reservation,
  onAction,
  disabled,
  actionId = "",
  actionLabel,
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();

  const location = getByValue(data.locationValue);

  const handelCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      onAction?.(actionId);
    },
    [onAction, disabled, actionId]
  );

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }
    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }
    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);
    return `${format(start, "PP")} -${format(end, "PP")}`;
  }, [reservation]);

  return (
    <div
      className="col-span-1 cursor-pointer group"
      onClick={() => router.push(`/listings/${data.id}`)}
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          <Image
            fill
            src={data.imageSrc}
            alt="listing"
            className="object-cover group-hover:scale-110 h-full w-full transition"
          />
          <div className="absolute top-3 right-3">
            <HeartButtons listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
        <div className="font-semibold text-lg">
          {location?.region}, {location?.label}
        </div>
        <div className="font-light text-neutral-500">
          {reservationDate || data.category}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">$ {price}</div>
          {!reservation && <div className="font-light">night</div>}
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handelCancel}
          />
        )}
      </div>
    </div>
  );
};

export default ListingCard;
