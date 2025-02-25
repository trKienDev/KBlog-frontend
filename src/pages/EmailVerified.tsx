import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const EmailVerified: React.FC = () => {
      const navigate = useNavigate();
      const [searchParams] = useSearchParams();
      const email = searchParams.get("email");

      useEffect(() => {
            if(email) {
                  console.log(`Email ${email} đã được xác thực!`);
            }

            navigate("/login");
      }, [email, navigate]);

      return (
            <div style={{ textAlign: "center", marginTop: "50px" }}>
                  <h2>Email xác thực thành công</h2>
                  <p>Đang chuyển hướng đến trang đăng nhập .... </p>
            </div>
      );
};

export default EmailVerified;