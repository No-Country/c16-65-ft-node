import React, { useState, useEffect } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://no-country-cwv9.onrender.com/api/users");
        if (response.ok) {
          const data = await response.json();
          setUsers(data.users);
        } else {
          console.error("Error al obtener los usuarios:", response.statusText);
        }
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
      }
    };

    fetchUsers();
  }, []);

  console.log(users, "usuarios");
  return (
    <div className="flex justify-center p-4">
      <div className="w-full md:w-2/3 lg:w-1/2">
        <h1 className="text-3xl font-bold mb-4 text-gray-700">Users</h1>
        <div className="overflow-x-auto">
          <table className="w-full bg-white border border-gray-300 rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="text-gray-600">
                  <td className="border px-4 py-2">{user.name}</td>
                  <td className="border px-4 py-2">{user.email}</td>
                  <td className="border px-4 py-2">{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
