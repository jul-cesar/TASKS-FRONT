import React from "react";
import AsignedTasksList from "../components/AsignedTasksList";
import Navbar from "@/components/Navbar";
import Tabs from "@/components/Tabs";

const AsignedPage = () => {
  return (
    <div className="h-full w-full">
      <Navbar />
      <Tabs />

      <div className="text-center m-2"></div>

      <AsignedTasksList />
    </div>
  );
};

export default AsignedPage;
