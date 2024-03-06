import { useEffect, useState } from "react";
import FormCreate from "./FormCreate";
import EditComic from "./EditComic";
import Users from "./Users";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("create");

  useEffect(() => {
    const userFromLocalStorage = JSON.parse(localStorage.getItem("user"));
    console.log(userFromLocalStorage.role);
    if (!userFromLocalStorage || userFromLocalStorage.role !== "admin") {
      window.location.href = "/products";
    }
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="">
      <div className="tabs flex">
        <button
          className={`px-4 py-2 mr-2 bg-gray-200 text-gray-700 rounded-md focus:outline-none focus:bg-gray-300 ${
            activeTab === "create" ? "active" : ""
          }`}
          onClick={() => handleTabChange("create")}
        >
          Create
        </button>
        <button
          className={`px-4 py-2 mr-2 bg-gray-200 text-gray-700 rounded-md focus:outline-none focus:bg-gray-300 ${
            activeTab === "edit" ? "active" : ""
          }`}
          onClick={() => handleTabChange("edit")}
        >
          Edit
        </button>
        <button
          className={`px-4 py-2 bg-gray-200 text-gray-700 rounded-md focus:outline-none focus:bg-gray-300 ${
            activeTab === "users" ? "active" : ""
          }`}
          onClick={() => handleTabChange("users")}
        >
          Users
        </button>
      </div>
      <div className="tab-content">
        {activeTab === "create" && <FormCreate />}
        {activeTab === "edit" && <EditComic />}
        {activeTab === "users" && <Users />}
      </div>
    </div>
  );
};

export default Admin;
