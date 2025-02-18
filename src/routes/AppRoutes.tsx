import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AdminPage from "../Admin/pages/AdminPage";
import UserPage from "../Admin/pages/UserPage";

const AppRoutes: React.FC = () => {
      return (
            <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/admin" element={<AdminPage />}>
                        <Route path="users" element={<UserPage/>}/>
                  </Route>
            </Routes>
      );
};

export default AppRoutes;