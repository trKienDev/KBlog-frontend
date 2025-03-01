import React, { useEffect } from "react";
import "./header.css"; // Import file CSS thuần
import logo from '../assets/KBlog.png';
import applyScanningEffect from "../utils/ScanningEffect";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
      useEffect(() => {
            applyScanningEffect(".logo", 5000, 1000);
      }, []);

      const navigate = useNavigate();
      const handleCreateAccount = () => {
            navigate("/register");
      };

      return (
            <header className="header">
                  <div className="page-container">
                        <div className="logo scannable"> {/* Thêm class "scannable" - scanningEffect */}
                              <img src={logo} alt="KBlog logo" className="logo-img"/>
                        </div>

                        <div className="search-container">
                              <input type="text" placeholder="Search..." className="search-input" />
                        </div>

                        <div className="auth-buttons">
                              <button className="btn-secondary" onClick={() => navigate("/login")}>Log in</button>
                              <button className="btn-primary" onClick={handleCreateAccount}>
                                    Create account
                              </button>
                        </div>
                  </div>
            </header>
      );
};

export default Header;
