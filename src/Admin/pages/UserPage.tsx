import React, { useState } from "react";
import "./UserPage.css";
import UserTable from "./UserTable";
import { Funnel, MagnifyingGlass } from "@phosphor-icons/react"; 

const UserPage: React.FC = () => {
      const [searchTerm, setSearchTerm] = useState("");

      return (
            <div className="user-page">
                  {/* Header của User Management */}
                  <div className="user-header">
                        <h2>All users <span className="user-count-box">44</span></h2>
                        <div className="user-actions">
                              <div className="search-container">
                                    <MagnifyingGlass className="search-icon" size={18} weight="bold" />
                                    <input 
                                          type="text" 
                                          placeholder="Search users..." 
                                          className="search-input"
                                          value={searchTerm}
                                          onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                              </div>
                              <button className="btn-secondary filter-btn">
                                    <Funnel size={16} weight="bold" />
                                    Filters
                              </button>
                        </div>
                  </div>

                  {/* Bảng User */}
                  <UserTable searchTerm={searchTerm} />
            </div>
      );
};

export default UserPage;
