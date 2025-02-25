import React, { useState, useRef } from "react";
import './RegisterWithEmail.css';
import { Asterisk } from "@phosphor-icons/react";
import EmailVerificationPopup from "./EmailVerficationPopup";
import { startEmailVerificationConnection } from "../utils/emailVerificationRegister";

const RegisterWithEmail: React.FC = () => {
      type FormDataType = {
            profileImage: File | null;
            name: string;
            username: string;
            email: string;
            password: string;
            confirmPassword: string;
      };

      const [formData, setFormData] = useState<FormDataType>({
            profileImage: null,
            name: "",
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
      });

      const [errors, setErrors] = useState({
            name: "",
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            profileImage: "",
            global: "",
      });

      const [showPopup, setShowPopup] = useState(false);
      const [isLoading, setIsLoading] = useState(false);

      const [previewImage, setPreviewImage] = useState<string | null>(null); 
      const fileInputRef = useRef<HTMLInputElement>(null); // Ref để trigger input file

      // Regex kiểm tra email hợp lệ
      const validateEmail = (email: string) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
      };

      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            setFormData((prev) => ({ ...prev, [name]: value }));

            // Kiể tra lỗi ngay khi user đăng nhập
            if(name === "email") {
                  setErrors((prev) => ({
                        ...prev,
                        email: value.trim() === "" ? "This field is required"
                                                                  : !validateEmail(value) ? "Invalid email format"
                                                                  : "",
                  }));
            } else if (name === "confirmPassword") {
                  setErrors((prev) => ({
                        ...prev,
                        confirmPassword: value.trim() === "" ? "This field is required"
                                                      : value != formData.password ? "Password do not match"
                                                      : "",
                  }));
            } else {
                  setErrors((prev) => ({
                        ...prev,
                        [name]: value.trim() === "" ? "This field is required" : "",
                  }));
            }
      };

      const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (!e.target.files || e.target.files.length === 0)  {
                  return; // Người dùng không chọn file, giữ nguyên trạng thái
            }
            const file = e.target.files[0];
            const validExtensions = ["image/png", "image/jpg", "image/jpeg"];

            const maxSize = 2 * 1024 * 1024; // 2MB
            if (file.size > maxSize) {
                  setErrors((prev) => ({
                        ...prev,
                        profileImage: "File size too large. Please upload a file smaller than 2MB",
                  }));
                  return;
            }
            if(!validExtensions.includes(file.type)) {
                  setErrors((prev) => ({
                        ...prev,
                        profileImage: "Invalid file format. Please upload a PNG, JPG, or JPEG file",
                  }));
                  return;
            }

            setErrors((prev) => ({
                  ...prev,
                  profileImage: "", // xoá lỗi nếu file hợp lệ
            }));

            setFormData((prev) => ({ ...prev, profileImage: file}));
            const imageURL = URL.createObjectURL(file);
            setPreviewImage(imageURL);
      };

      const handleBrowseClick = () => {
            if (fileInputRef.current) {
                  fileInputRef.current.click(); // Kích hoạt input file khi bấm nút
            }
      };

      const handleRemoveImage = () => {
            setFormData((prev) => ({ ...prev, profileImage: null }));
            setPreviewImage(null);

            // Xoá giá trị của input file
            if(fileInputRef.current) {
                  fileInputRef.current.value = "";
            }
      };

      const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
            setErrors({ ...errors, global: ""});
            setIsLoading(true); // set loading when start sending request

            let hasError = false;
            const newErrors = { ...errors };

            // Kiểm tra nếu mất kết nối mạng
            if(!navigator.onLine) {
                  setErrors((prev) => ({
                        ...prev,
                        global: "Connection lost, please try again",
                  }));
                  setIsLoading(false); // turn off loading when connection lost
                  return;
            }

            Object.entries(formData).forEach(([key, value]) => {
                  if (!value) {
                        hasError = true;
                        setErrors((prev) => ({
                              ...prev,
                              [key as keyof FormDataType]: "This field is required",
                        }));
                  }
            });

            // Kiểm tra lại email trước khi submit
            if (!validateEmail(formData.email)) {
                  newErrors.email = "Invalid email format";
                  hasError = true;
            }

            // Kiểm tra Password và Confirm Password
            if(formData.password !== formData.confirmPassword) {
                  newErrors.confirmPassword = "Password do not match";
                  hasError = true;
            }

            // Kiểm tra nếu chưa tải ảnh đại diện
            if (!formData.profileImage) {
                  newErrors.profileImage = "Profile image is required";
                  hasError = true;
            }

            setErrors(newErrors);

            if(hasError) {
                  console.log("Error: ", newErrors);
                  setIsLoading(false);
                  return;
            }

            console.log("Form Data Submitted: ", formData);
            
            // Nếu muốn gửi ảnh lên server, cần tạo FormData
            const formDataToSend = new FormData();
            formDataToSend.append("name", formData.name);
            formDataToSend.append("userName", formData.username);
            formDataToSend.append("email", formData.email);
            formDataToSend.append("password", formData.password);
            if (formData.profileImage) {
                  formDataToSend.append("profileImage", formData.profileImage);
            }
            
            try {
                  const response = await fetch("http://localhost:3642/api/user/register", {
                        method: "POST",
                        body: formDataToSend,
                  });
                  const data = await response.json();

                  if(response.ok) {
                        // Đăng ký success => Bắt đầu kết nối SignalR để chờ xác thực
                        startEmailVerificationConnection(formData.email);
                        setShowPopup(true);
                  } else {
                        setErrors((prev) => ({
                              ...prev,
                              global: data.error || "Error!",
                        }));
                  }
            } catch(error) {
                  console.error("Error: ", error);
                  setErrors((prev) => ({
                        ...prev,
                        global: "Cannot connect API",
                  }));
            } finally {
                  setIsLoading(false);
            }
      };
      
      return (
            <div className="register-email-container">
                  <h2 className="title">Create an account with Email</h2>
                  <form onSubmit={handleSubmit}>
                        <div className="input-container">
                              <label className="label">
                                    Name
                                    <Asterisk size={8} color="red" weight="bold" className="asterisk-icon"/>
                              </label>
                              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                        </div>
                        <div className="input-container">
                              <label className="label">
                                    Username
                                    <Asterisk size={8} color="red" weight="bold" className="asterisk-icon"/>
                              </label>
                              <input type="text" name="username" value={formData.username} onChange={handleChange} required />
                        </div>
                        <div className="input-container">
                              <label className="label">
                                    Email
                                    <Asterisk size={8} color="red" weight="bold" className="asterisk-icon"/>
                              </label>
                              <input type="email" name="email"value={formData.email} onChange={handleChange} required />
                              {errors.email && <p className="error-message">{errors.email}</p>}
                        </div>
                        <div className="input-container">
                              <label className="label">
                                    Password
                                    <Asterisk size={8} color="red" weight="bold" className="asterisk-icon"/>
                              </label>
                              <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                        </div>
                        <div className="input-container">
                              <label className="label">
                                    Confirm password
                                    <Asterisk size={8} color="red" weight="bold" className="asterisk-icon"/>
                              </label>
                              <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
                              {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
                        </div>
                        <div className="input-container">
                              <label className="label">
                                    Profile Image
                                    <Asterisk size={8} color="red" weight="bold" className="asterisk-icon"/>
                              </label>
                              <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden-file-input" />
                              <div className="custom-file-upload">
                                    <button type="button" className="btn-secondary" onClick={handleBrowseClick}>
                                          Upload Image
                                    </button>
                                    <span className="file-name">
                                          {formData.profileImage ? formData.profileImage.name : "No file selected"}
                                    </span>
                              </div>
                              {errors.profileImage && <p className="error-message">{errors.profileImage}</p>}
                               
                              {/* Hiển thị ảnh xem trước nếu có */}
                              {previewImage && (
                                    <div className="preview-container">
                                          <div className="image-wrapper">
                                                <img src={previewImage} alt="Profile Preview" className="image-preview"/>
                                                <button type="button" className="btn-remove" onClick={handleRemoveImage}>
                                                      ✖
                                                </button>
                                          </div>
                                    </div>
                              )}
                        </div>
                        {errors.global && <p className="error-message">{errors.global}</p>}
                        <button type="submit" className="btn-primary" disabled={isLoading}>
                              {isLoading ? (
                                    <div className="spinner"></div>
                              ) : (
                                    "Sign up"
                              )}
                        </button>
                  </form>
                  
                  {showPopup && <EmailVerificationPopup email={formData.email} /> }
            </div>
      );
};

export default RegisterWithEmail;
