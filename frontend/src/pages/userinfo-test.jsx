import useCurrentUser from "../../utils/useCurrentUser";

const HomePage = () => {
  const user = useCurrentUser();

  if (!user) return <p>Loading user info...</p>;

  return (
    <div>
      <h1>Welcome back, {user.firstname} {user.lastname}!</h1>
      <p>Email: {user.email}</p>
      <p>id: {user._id}</p>
      <p>isProfessional: {user.isProfessional.toString()}</p>
    </div>
  );
};

export default HomePage;
