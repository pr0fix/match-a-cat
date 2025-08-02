import { useAuthStore } from "../stores/authStore";

const Logout = () => {
  const { logout } = useAuthStore();

  return (
    <>
      <button type="button" onClick={() => logout()}>
        Log out
      </button>
    </>
  );
};

export default Logout;
