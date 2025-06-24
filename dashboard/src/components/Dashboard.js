import React from "react";
import { Route, Routes } from "react-router-dom";

import Apps from "./Apps";
import Funds from "./Funds";
import Holdings from "./Holdings";

import Orders from "./Orders";
import Positions from "./Positions";
import Summary from "./Summary";
import WatchList from "./WatchList";
import RequestAuth from "./RequireAuth.js";
// import { GeneralContextProvider } from "./GeneralContext";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      {/* <GeneralContextProvider> */}
      <WatchList />
      {/* </GeneralContextProvider> */}
      <div className="content">
        <Routes>
          <Route exact path="/" element={<RequestAuth><Summary /></RequestAuth>} />
          <Route path="/orders" element={<RequestAuth><Orders /></RequestAuth>} />
          <Route path="/holdings" element={<RequestAuth><Holdings /></RequestAuth>} />
          <Route path="/positions" element={<RequestAuth><Positions /></RequestAuth>} />
          <Route path="/funds" element={<RequestAuth><Funds /></RequestAuth>} />
          <Route path="/apps" element={<RequestAuth><Apps /></RequestAuth>} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
