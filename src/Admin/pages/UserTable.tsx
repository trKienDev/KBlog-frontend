import React, { useState } from "react";
import "./UserTable.css";

interface User {
      id: number;
      name: string;
      email: string;
      role: string;
      lastActive: string;
      dateAdded: string;
      avatar: string;
}

const initialUsers: User[] = [
  {
    id: 1,
    name: "Florence Shaw",
    email: "florence@gmail.com",
    role: "Admin",
    lastActive: "Mar 4, 2024",
    dateAdded: "July 4, 2022",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    id: 2,
    name: "Amélie Laurent",
    email: "amelie@gmail.com",
    role: "Data Export",
    lastActive: "Mar 4, 2024",
    dateAdded: "July 4, 2022",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: 3,
    name: "Armar Foley",
    email: "armar@gmail.com",
    role: "Data Import",
    lastActive: "Mar 4, 2024",
    dateAdded: "July 4, 2022",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    id: 4,
    name: "Caitlyn King",
    email: "caitlyn@gmail.com",
    role: "User",
    lastActive: "Mar 4, 2024",
    dateAdded: "July 4, 2022",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
  },
];

interface UserTableProps {
      searchTerm: string;
}

const UserTable: React.FC<UserTableProps> = ({ searchTerm }) => {
      const [users] = useState<User[]>(initialUsers);

      // Lọc user theo searchTerm
      const filteredUsers = users.filter(user => 
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );

      return (
            <div className="table-container">
                  <table className="user-table">
                        <thead>
                              <tr>
                                    <th className="checkbox"></th>
                                    <th>Avatar</th>
                                    <th>User Name</th>
                                    <th>Email</th>
                                    <th>Access</th>
                                    <th>Last Active</th>
                                    <th>Date Added</th>
                                    <th className="actions">Actions</th>
                              </tr>
                        </thead>
                        <tbody>
                              {filteredUsers.map((user) => (
                                    <tr key={user.id}>
                                          <td><input type="checkbox" /></td>
                                          <td className="avatar-cell">
                                                <img src={user.avatar} alt="Avatar" className="avatar" />
                                          </td>
                                          <td>{user.name}</td>
                                          <td className="email-cell">{user.email}</td>
                                          <td>{user.role}</td>
                                          <td>{user.lastActive}</td>
                                          <td>{user.dateAdded}</td>
                                          <td>
                                                <button className="action-btn">⋮</button>
                                          </td>
                                    </tr>
                              ))}
                        </tbody>
                  </table>
            </div>
      );
};

export default UserTable;
