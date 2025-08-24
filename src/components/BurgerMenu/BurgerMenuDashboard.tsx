import { X } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { NavBar } from "../NavBar/NavBar";
import { UserBar } from "../UserBar/UserBar";
import { Logo } from "../Logo/Logo";

interface BurgerMenuDashboardProps {
  onClose: () => void;
}

export const BurgerMenuDashboard: React.FC<BurgerMenuDashboardProps> = ({
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimat, setIsAnimat] = useState(false);

  const handleClose = useCallback(() => {
    setIsAnimat(true);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 10);
    document.body.style.overflow = "hidden";

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [handleClose]);

  return (
    <div className="desktop:hidden fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/10 backdrop-blur-sm"
        onClick={handleClose}
        aria-hidden="true"
      />

      <div
        className={`absolute right-0 top-0 h-full w-[80%] max-w-sm bg-green-light
           transition-transform duration-300 ease-in-out flex flex-col ${
             isVisible && !isAnimat ? "translate-x-0" : "translate-x-full"
           }`}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex justify-between p-4">
          <Logo variant="white" />
          <button
            onClick={handleClose}
            className="p-2 text-white transition-transform duration-300 
            ease-in-out hover:rotate-360 hover:scale-110 active:scale-95"
            aria-label="Close menu"
          >
            <X className="w-9 h-9" />
          </button>
        </div>
        <nav className="flex flex-col items-center justify-center flex-grow space-y-6 px-6">
          <NavBar isMobile onItemClick={handleClose} />
          <div className="w-full max-w-xs pt-8">
            <UserBar isMobile onItemClick={handleClose} />
          </div>
        </nav>
      </div>
    </div>
  );
};
