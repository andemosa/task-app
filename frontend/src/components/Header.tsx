import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";

import { Button } from "@/components/ui/button";

import { useModalContext } from "@/context/useModalContext";
import { useAuthContext } from "@/context/useAuthContext";

import { Logo, SettingsIcon, BellIcon, HamBurgerIcon } from "./Icons";

const Header = () => {
  const { openLoginModal, openRegisterModal, openProfileModal } = useModalContext();
  const { user, logOut } = useAuthContext();

  return (
    <header className="flex lg:py-4 lg:px-10 xl:px-20 py-5 px-4 border-b border-[#EAECF0] fixed top-0 left-0 w-full bg-white z-30">
      <div className="max-w-[1280px] mx-auto flex items-center gap-4 justify-between w-full">
        <Logo />
        {user ? (
          <div className="flex items-center gap-4 lg:gap-10">
            <span className="lg:inline-block hidden cursor-pointer" onClick={openProfileModal}>
              <SettingsIcon />
            </span>
            <span className="lg:inline-block hidden cursor-pointer">
              <BellIcon />
            </span>
            <Popover>
              <PopoverTrigger>
                <img
                  src={user.avatar}
                  alt="avatar"
                  className="lg:inline-block hidden cursor-pointer h-8 w-8 rounded-full border-2"
                />
              </PopoverTrigger>
              <PopoverContent className="py-4 px-6 bg-white border rounded-md">
                <Button className="border-[#D0D5DD] flex-1" onClick={logOut}>
                  Logout
                </Button>
              </PopoverContent>
            </Popover>
            <span className="cursor-pointer lg:hidden inline ">
              <HamBurgerIcon />
            </span>
          </div>
        ) : (
          <div className="flex gap-2">
            <Button
              variant={"outline"}
              className="border-[#D0D5DD] flex-1"
              onClick={openLoginModal}
            >
              Login
            </Button>
            <Button className="bg-[#3F5BF6] flex-1" onClick={openRegisterModal}>
              Register
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
