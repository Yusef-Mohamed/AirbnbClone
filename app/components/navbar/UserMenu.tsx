"use client";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useCallback, useState } from "react";
import Menuitem from "./Menuitem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";
import useRentModel from "@/app/hooks/useRentModel";
import { useRouter } from "next/navigation";
interface UserMenuProps {
  currentUser?: SafeUser | null;
}
const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModel();
  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    rentModal.onOpen();
  }, [currentUser, loginModal, rentModal]);
  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="hidden md:block font-semibold text-sm py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          Airbnb your home
        </div>
        <div
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center cursor-pointer hover:shadow-md transition rounded-full "
        >
          <AiOutlineMenu />
          <div className="hidden md:block ml-2">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 overflow-hidden right-0 top-12 text-sm z-10">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <Menuitem
                  onClick={() => {
                    router.push("/trips");
                  }}
                  label="My trips"
                />
                <Menuitem
                  onClick={() => {
                    router.push("/favorites");
                  }}
                  label="My favorites"
                />
                <Menuitem
                  onClick={() => {
                    router.push("/reservations");
                  }}
                  label="My reservations"
                />
                <Menuitem
                  onClick={() => {
                    router.push("/properties");
                  }}
                  label="My properties"
                />
                <Menuitem onClick={rentModal.onOpen} label="Airbnb my home" />
                <hr />
                <Menuitem onClick={() => signOut()} label="Logout" />
              </>
            ) : (
              <>
                <Menuitem onClick={loginModal.onOpen} label="Login" />
                <Menuitem onClick={registerModal.onOpen} label="Sign up" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
