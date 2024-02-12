import React from "react";
import { Outlet } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import NavBar from "../Nav/NavBar";
import SideBar from "../Nav/SideBar";

import "./DashBoard.scss";

const Dashboard = () => {
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <SideBar />
        <div className="col p-0 m-0">
          <div className="d-flex justify-content-center shadow"></div>
          <NavBar />
          <div className="main-body">
            <div className="block">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
