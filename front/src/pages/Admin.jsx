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
      <div className="tabs_admin flex">
        <button
          className={` admin_button ${
            activeTab === "create" ? "active" : ""
          }`}
          onClick={() => handleTabChange("create")}
        >
          Create
        </button>
        <button
          className={` admin_button ${
            activeTab === "edit" ? "active" : ""
          }`}
          onClick={() => handleTabChange("edit")}
        >
          Edit
        </button>
        <button
          className={`admin_button  ${
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
