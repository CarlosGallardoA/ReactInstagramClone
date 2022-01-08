import React, { useEffect } from "react";
import Header from "../components/Header";
import Siderbar from "../components/Sidebar";
import Timeline from "../components/Timeline";

const Dashboard = () => {
  useEffect(() => {
    document.title = "Instagram";
  }, []);
  return (
    <div className="bg-gray-background">
      <Header />
      <div className="grid grid-cols-3 gap-4 justify-between mx-auto lg:max-w-screen-lg sm:max-w-screen-sm md:max-w-screen-md">
        <Timeline />
        <Siderbar />
      </div>
    </div>
  );
};

export default Dashboard;
