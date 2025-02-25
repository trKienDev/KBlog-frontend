import React from "react";
import "./EmailVerificationPopup.css";

const EmailVerificationPopup: React.FC<{ email: string }> = ({ email }) => {
      return (
            <div className="popup-container">
                  <div className="popup">
                        <h2>Xác nhận email</h2>
                        <p>📨 <span style={{ color: "blue", fontWeight: "bold"}}>KBlog</span> đã gửi email xác nhận đến <strong>{email}</strong></p>
                        <p>📪 Vui lòng kiểm tra hộp thư và xác nhận tài khoản.</p>
                        <p style={{ color: "red" }}> ❌     Hộp thoại này sẽ tự động đóng khi bạn xác nhận email</p>
                  </div>
            </div>
      );
};

export default EmailVerificationPopup;