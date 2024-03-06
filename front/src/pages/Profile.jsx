import { useEffect, useState } from "react";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [userPurchases, setUserPurchases] = useState([]);

  useEffect(() => {
    const storedUserData = localStorage.getItem("user");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
      fetchUserPurchases(JSON.parse(storedUserData).email);
    }
  }, []);

  const fetchUserPurchases = async (email) => {
    try {
      const response = await fetch(
        `https://no-country-cwv9.onrender.com/api/purchases/search/${email}`
      );
      if (response.ok) {
        const data = await response.json();
        setUserPurchases(data.purchase);
      } else {
        console.error("Failed to fetch user purchases");
      }
    } catch (error) {
      console.error("Error fetching user purchases:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="bg-gray-300 p-6 rounded-lg shadow-md">
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
      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Historial de Compras
        </h2>
        <div className="grid gap-4 flex">
          {userPurchases.map((purchase) => (
            <div
              key={purchase._id}
              className="bg-white p-4 rounded-lg shadow-md"
            >
              <p>
                Fecha de compra:{" "}
                {new Date(purchase.purchase_datetime).toLocaleString()}
              </p>
              <p>Productos:</p>
              <ul>
                {purchase.products.map((product, index) => (
                  <li key={index}>{product._id.title}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
