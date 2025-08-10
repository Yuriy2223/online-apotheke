"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { Container } from "@/shared/Container";
import { NavBar } from "../NavBar/NavBar";
import { Logo } from "../Logo/Logo";
import { useAppDispatch } from "@/redux/store";
import { logoutUser } from "@/redux/auth/operations";
import { BurgerMenuDashboard } from "../BurgerMenu/BurgerMenuDashboard";

export const HeaderDashboard = () => {
  const dispatch = useAppDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);
  const openMenu = () => setIsMenuOpen(true);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <>
      <Container className="flex items-center justify-between h-16 max-tablet:h-[84px] tablet:h-[100px]">
        <Logo variant="white" />
        <div className="hidden desktop:block">
          <NavBar />
        </div>
        <div className="hidden desktop:block">
          <button
            onClick={handleLogout}
            className="px-6 py-2 text-green-dark bg-white-true border border-white rounded-full hover:bg-gray-100 transition-colors"
          >
            Logout
          </button>
        </div>
        <div className="flex items-center gap-4 desktop:hidden">
          <button
            onClick={openMenu}
            className="desktop:hidden transition-transform duration-200 hover:scale-110 "
            aria-label="Open menu"
          >
            <Menu className="w-8 h-8 text-white-true transition-transform duration-300 ease-in-out hover:rotate-360 hover:scale-110 active:scale-95" />
          </button>
        </div>
      </Container>
      {isMenuOpen && <BurgerMenuDashboard onClose={closeMenu} />}
    </>
  );
};
