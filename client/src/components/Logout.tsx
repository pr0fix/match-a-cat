import { useNavigate } from "react-router";
import { useAuthStore } from "../stores/authStore";
import { MdLogout } from "react-icons/md";

const Logout: React.FC<LogoutItemProps> = ({ isOpen }) => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogOut = () => {
    logout(navigate);
  };

  return (
    <button
      onClick={handleLogOut}
      className="flex items-center py-4 text-[var(--text-950)] hover:bg-[var(--background-500)] cursor-pointer transition-colors relative md:w-full border-none bg-transparent focus:outline-none focus:bg-[var(--background-400)]"
      aria-label="Logout"
    >
      <div className="flex justify-center w-[75px]">
        <MdLogout color="var(--text-950)" size={24} />
      </div>
      <div
        className={`absolute left-[70px] whitespace-nowrap transition-all duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        Logout
      </div>
    </button>
  );
};

interface LogoutItemProps {
  isOpen: boolean;
}

export default Logout;
