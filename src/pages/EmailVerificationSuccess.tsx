import "./EmailVerificationSuccess.css"; // Import file CSS riêng

const EmailVerificationSuccess = () => {
    // Xử lý khi nhấn nút "Đóng"
    const handleClose = () => {
        window.close(); // Đóng tab trình duyệt
    };

    return (
        <div className="container">
            <div className="box">
                <div className="gif-container">
                    <video className="gif" autoPlay loop muted>
                        <source src="/src/assets/check-mark.webm" type="video/webm" />
                        Trình duyệt của bạn không hỗ trợ video.
                    </video>
                </div>
                <h1>Xác nhận Email Thành công!</h1>
                <p>Cảm ơn bạn đã xác nhận email</p> 
                <p>Bạn có thể đóng tab này và quay lại ứng dụng.</p>
                <button className="close-btn" onClick={handleClose}>Đóng</button>
            </div>
        </div>
    );
};

export default EmailVerificationSuccess;
