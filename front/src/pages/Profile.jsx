import { useEffect, useState } from "react";

const Profile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem("user");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  return (
    <div className="max-w-md mx-auto mt-10 bg-gray-300 p-6 rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold mb-4 text-center">Perfil</h1>
      {userData && (
        <div className="flex flex-col items-center">
          <img
            src={userData.picture}
            alt={userData.name}
            className="rounded-full h-24 w-24 mb-4 mx-auto"
          />
          <p className="text-lg mb-2">{userData.name}</p>
          <p className="text-lg mb-2">{userData.email}</p>
          <p className="text-lg mb-2">Rol: {userData.role}</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
