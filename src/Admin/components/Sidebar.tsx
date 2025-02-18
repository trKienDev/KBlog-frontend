import { FC } from "react";
import { Link } from "react-router-dom";
import { House, Gear, User, NotePencil, Tag, ChartBar, ChatCenteredDots } from "@phosphor-icons/react";
import "./sidebar.css";

const Sidebar: FC = () => {
      return (
            <nav className="sidebar">
                  <ul>
                        <li>
                              <Link to="dashboard" className="sidebar-item">
                                    <House size={28} weight="fill" color="white" />
                                    <span className="sidebar-name">Dashboard</span>
                              </Link>
                        </li>
                        <li>
                              <Link to="users" className="sidebar-item">
                                    <User size={28} weight="fill" color="white" />
                                    <span className="sidebar-name">Manage Users</span>
                              </Link>
                        </li>
                        <li>
                              <Link to="/posts" className="sidebar-item">
                                    <NotePencil size={28} weight="fill" color="white" />
                                    <span className="sidebar-name">Manage Posts</span>
                              </Link> 
                        </li>
                        <li>
                              <Link to="/comments" className="sidebar-item">
                                    <ChatCenteredDots size={28} weight="fill" color="white" />
                                    <span className="sidebar-name">Manage Comments</span>
                              </Link> 
                        </li>
                        <li>
                              <Link to="/categories" className="sidebar-item">
                                    <Tag size={28} weight="fill" color="white" />
                                    <span className="sidebar-name">Category & Tag</span>
                              </Link> 
                        </li>
                        <li>
                              <Link to="/statistics" className="sidebar-item">
                                    <ChartBar size={28} weight="fill" color="white" />
                                    <span className="sidebar-name">Statistics & Analytics</span>
                              </Link> 
                        </li>
                        <li>
                              <Link to="/settings" className="sidebar-item">
                                    <Gear size={28} weight="fill" color="white" />
                                    <span className="sidebar-name">System Configuration</span>
                              </Link> 
                        </li>
                  </ul>
            </nav>
      );
};

export default Sidebar;
