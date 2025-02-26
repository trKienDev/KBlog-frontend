import React from "react";
import "./EmailVerificationPopup.css";

const EmailVerificationPopup: React.FC<{ email: string }> = ({ email }) => {
      return (
            <div className="popup-container">
                  <div className="popup">
                        <div className="gif-container">
                              <video className="gif" autoPlay loop muted>
                                    <source src="/src/assets/check-email.webm" type="video/webm" />
                                    Trình duyệt của bạn không hỗ trợ video.
                              </video>
                        </div>
                        <h2>Xác nhận email</h2>
                        <p>📨 <span style={{ color: "blue", fontWeight: "bold"}}>KBlog</span> đã gửi email xác nhận đến <strong>{email}</strong></p>
                        <p>📪 Vui lòng kiểm tra hộp thư và xác nhận tài khoản.</p>
                        <p style={{ color: "red" }}> ❌     Hộp thoại này sẽ tự động đóng khi bạn xác nhận email</p>
                  </div>
            </div>
      );
};

export default EmailVerificationPopup;