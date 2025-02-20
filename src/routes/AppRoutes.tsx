import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AdminPage from "../Admin/pages/AdminPage";
import UserPage from "../Admin/pages/UserPage";
import RegisterPage from "../pages/RegisterPage";
import RegisterWithEmail from "../components/RegisterWithEmail";

const AppRoutes: React.FC = () => {
      return (
            <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/admin" element={<AdminPage />}>
                        <Route path="users" element={<UserPage/>}/>
                  </Route>
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/register/email" element={<RegisterWithEmail />} /> 
                  
                  
            </Routes>
      );
};

export default AppRoutes;