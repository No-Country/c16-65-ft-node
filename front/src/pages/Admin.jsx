import { useEffect, useState } from "react";
import FormCreate from "./FormCreate";
import EditComic from "./EditComic";

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
    <>
      <div className="tabs">
        <button className={activeTab === "create" ? "active" : ""} onClick={() => handleTabChange("create")}>
          Create
        </button>
        <button className={activeTab === "edit" ? "active" : ""} onClick={() => handleTabChange("edit")}>
          Edit
        </button>
      </div>
      <div className="tab-content">
        {activeTab === "create" && <FormCreate />}
        {activeTab === "edit" && <EditComic />}
      </div>
    </>
  );
};

export default Admin;
