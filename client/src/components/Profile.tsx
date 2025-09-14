import { useAuthStore } from "../stores/authStore";

const Profile: React.FC = () => {
  const { user } = useAuthStore();

  return (
    <div className="flex flex-col p-4 md:p-5 mt-6 md:mt-0">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Profile</h1>
      <img src={user?.pictureUrl} width={200} height={200} />
      <p>{user?.name}</p>
      <p>
        {`Last active: ${user?.lastActive ? new Date(user.lastActive).toLocaleString() : ""}`}
      </p>
    </div>
  );
};

export default Profile;
