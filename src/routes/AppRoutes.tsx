import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AdminPage from "../Admin/pages/AdminPage";
import UserPage from "../Admin/pages/UserPage";
import RegisterPage from "../pages/RegisterPage";
import RegisterWithEmail from "../components/RegisterWithEmail";
import EmailVerificationSuccess from "../pages/EmailVerificationSuccess";

const AppRoutes: React.FC = () => {
      return (
            <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/admin" element={<AdminPage />}>
                        <Route path="users" element={<UserPage/>}/>
                  </Route>
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/register/email" element={<RegisterWithEmail />} /> 
                  <Route path="/email-verified" element={<EmailVerificationSuccess />} />
            </Routes>
      );
};

export default AppRoutes;