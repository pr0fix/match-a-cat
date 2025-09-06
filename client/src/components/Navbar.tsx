import { useState } from "react";
import { RxHamburgerMenu, RxCross2, RxHome } from "react-icons/rx";
import Logout from "./Logout";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div
        className={`flex flex-col bg-[var(--background-200)] h-full transition-all duration-300 ease-in-out ${
          isOpen ? "w-[250px]" : "w-[75px]"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-[var(--primary-900)]">
          <span
            onClick={handleOpen}
            className="w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-[var(--background-500)] rounded-md"
          >
            {isOpen ? (
              <RxCross2 color="white" size={24} />
            ) : (
              <RxHamburgerMenu color="white" size={24} />
            )}
          </span>
          <div className="relative flex-1">
            <span
              className={`absolute left-2 top-1/2 -translate-y-1/2 text-[var(--text-950)] font-bold transition-opacity duration-300 ${
                isOpen ? "opacity-100" : "opacity-0"
              }`}
            >
              Menu
            </span>
          </div>
        </div>

        <div className="mt-4 flex flex-col space-y-2 h-full">
          <NavItem
            icon={<RxHome color="var(--text-950)" size={20} />}
            text="Home"
            isOpen={isOpen}
          />
          <NavItem
            icon={<RxHome color="var(--text-950)" size={20} />}
            text="Favorites"
            isOpen={isOpen}
          />
          <NavItem
            icon={<RxHome color="var(--text-950)" size={20} />}
            text="Matches"
            isOpen={isOpen}
          />
          <NavItem
            icon={<RxHome color="var(--text-950)" size={20} />}
            text="Profile"
            isOpen={isOpen}
          />
        </div>

          <Logout isOpen={isOpen}/>

      </div>
    </>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  text: string;
  isOpen: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon, text, isOpen }) => {
  return (
    <a
      className="flex items-center py-2 text-[var(--text-950)] hover:bg-[var(--background-500)] cursor-pointer transition-colors"
      href="#"
    >
      <div className="flex justify-center w-[75px]">{icon}</div>
      <div
        className={`absolute left-[70px] whitespace-nowrap transition-all duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {text}
      </div>
    </a>
  );
};

export default Navbar;
