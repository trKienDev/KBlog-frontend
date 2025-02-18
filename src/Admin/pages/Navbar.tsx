import { CaretRight, UserCircle } from "@phosphor-icons/react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./navbar.css";

const Navbar: React.FC = () => {
      const location = useLocation();

      // Generate breadcumbs from URL
      const genrateBreadcumbs = () => {
            const paths = location.pathname.split("/").filter((path) => path);
            return paths.map((path, index) => {
                  const routeTo = "/" + paths.slice(0, index + 1).join("/");
                  return (
                        <span key={routeTo} className="breadcumb-item">
                              {index > 0 && <CaretRight size={14} weight="bold" className="breadcrumb-icon" />}
                              <Link to={routeTo}>{path.charAt(0).toUpperCase() + path.slice(1)}</Link>
                        </span>
                  );
            });
      };

      return (
            <nav className="navbar">
                  <div className="breadcumbs">
                        {genrateBreadcumbs()}
                  </div>
                  <div className="user-info">
                        <span className="user-name">Florence Shaw</span>
                        <UserCircle size={32} weight="fill" color="#555" />
                  </div>
            </nav>
      );
};

export default Navbar;