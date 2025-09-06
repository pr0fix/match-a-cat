import { useState } from "react";
import {
  RxHamburgerMenu,
  RxCross2,
  RxHome,
  RxHeart,
  RxPerson,
} from "react-icons/rx";
import Logout from "./Logout";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile navbar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-[var(--background-200)] border-b border-[var(--primary-900)]">
        <div className="flex justify-between items-center p-4">
          <span
            onClick={handleOpen}
            className="flex items-center justify-center w-[40px] h-[40px] cursor-pointer hover:bg-[var(--background-500)] rounded-md"
          >
            {isOpen ? (
              <RxCross2 color="var(--text-950)" size={24} />
            ) : (
              <RxHamburgerMenu color="var(--text-950)" size={24} />
            )}
          </span>
          <span className="text-[var(--text-950)] font-bold">Match-A-Cat</span>
          <Logout isOpen={false} />
        </div>

        {/* Mobile dropdown menu */}
        <div
          className={`overflow-hidden transition-all duration-300 ${
            isOpen ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col">
            <MobileNavItem
              icon={<RxHome color="var(--text-950)" size={24} />}
              text="Home"
            />
            <MobileNavItem
              icon={<RxHeart color="var(--text-950)" size={24} />}
              text="Matches"
            />
            <MobileNavItem
              icon={<RxPerson color="var(--text-950)" size={24} />}
              text="Profile"
            />
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div
        className={`hidden md:flex md:flex-col bg-[var(--background-200)] transition-all duration-300 ease-in-out h-full ${
          isOpen ? "w-[250px]" : "w-[75px]"
        }`}
      >
        <div className="flex justify-between items-center border-b border-[var(--primary-900)]">
          <span
            onClick={handleOpen}
            className="flex items-center justify-center w-[75px] h-[75px] cursor-pointer"
          >
            {isOpen ? (
              <div className="p-2 rounded-md hover:bg-[var(--background-500)]">
                <RxCross2 color="var(--text-950)" size={24} />
              </div>
            ) : (
              <div className="p-2 rounded-md hover:bg-[var(--background-500)]">
                <RxHamburgerMenu color="var(--text-950)" size={24} />
              </div>
            )}
          </span>
          <div className="relative flex-1">
            <span
              className={`absolute top-1/2 -translate-y-1/2 text-[var(--text-950)] font-bold transition-opacity duration-300 ${
                isOpen ? "opacity-100" : "opacity-0"
              }`}
            >
              Menu
            </span>
          </div>
        </div>

        <div className="flex flex-col space-y-2 flex-grow">
          <NavItem
            icon={<RxHome color="var(--text-950)" size={24} />}
            text="Home"
            isOpen={isOpen}
          />
          <NavItem
            icon={<RxHeart color="var(--text-950)" size={24} />}
            text="Matches"
            isOpen={isOpen}
          />
          <NavItem
            icon={<RxPerson color="var(--text-950)" size={24} />}
            text="Profile"
            isOpen={isOpen}
          />
        </div>

        <div className="mt-auto">
          <Logout isOpen={isOpen} />
        </div>
      </div>

      {/* Mobile spacer to prevent content from being hidden under the navbar */}
      <div className="h-16 md:hidden"></div>
    </>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  text: string;
  isOpen: boolean;
}

// Desktop navigation item
const NavItem: React.FC<NavItemProps> = ({ icon, text, isOpen }) => {
  return (
    <a
      className="flex items-center py-2 text-[var(--text-950)] hover:bg-[var(--background-500)] cursor-pointer transition-colors"
      href="#"
    >
      <div className="flex justify-center w-[75px] h-[50px] items-center">
        {icon}
      </div>
      <div
        className={`absolute left-[75px] whitespace-nowrap transition-all duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {text}
      </div>
    </a>
  );
};

// Mobile navigation item
const MobileNavItem: React.FC<{ icon: React.ReactNode; text: string }> = ({
  icon,
  text,
}) => {
  return (
    <a
      className="flex items-center py-3 px-6 text-[var(--text-950)] hover:bg-[var(--background-500)] cursor-pointer transition-colors"
      href="#"
    >
      <div className="flex items-center justify-center w-[40px] mr-4">
        {icon}
      </div>
      <div>{text}</div>
    </a>
  );
};

export default Navbar;
