
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "./admin.css";
import React from "react";
import Navbar from "./Navbar";

const AdminPage: React.FC = () => {
      return (
            // Sidebar cố định bên trái
            <div className="admin-container"> 
                  <Sidebar />

                  <div className="admin-content">
                        <Navbar />

                        {/* Nội dung chính */}
                        <main className="main-content">
                              <Outlet />
                        </main>
                  </div>
            </div>
      );
};

export default AdminPage;