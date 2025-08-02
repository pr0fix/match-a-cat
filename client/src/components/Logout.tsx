import { useAuthStore } from "../stores/authStore";

const Logout = () => {
  const { logout } = useAuthStore();

  return (
    <>
      <button
        type="button"
        onClick={() => logout()}
        className="font-bold border-2 p-2 rounded text-base"
      >
        Log out
      </button>
    </>
  );
};

export default Logout;
