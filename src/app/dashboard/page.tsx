import React from "react";

import SkillTable from "@//components/table/SkillTable";
import SessionTable from "@//components/table/SessionTable";
import AvailabilitiesTable from "@//components/table/AvailabilityTable";

const Dashboard = () => {
  return (
    <div>
      <div className="bg-neutral-50">
        <div className="container flex items-center justify-center py-10">
          <h2 className="text-2xl font-bold text-neutral-700">Dashboard</h2>
        </div>
      </div>
      <div className="">
        <SkillTable />
        <SessionTable />
        <AvailabilitiesTable />
      </div>
    </div>
  );
};

export default Dashboard;
