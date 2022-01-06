import React, { useEffect } from "react";
import Header from "../components/Header";
import Siderbar from "../components/Siderbar";
import Timeline from "../components/Timeline";

const Dashboard = () => {
  useEffect(() => {
    document.title = "Instagram";
  }, []);
  return (
    <div className="bg-gray-background">
      <Header />
      <div className="grid">
        <Timeline />
        <Siderbar />
      </div>
    </div>
  );
};

export default Dashboard;
