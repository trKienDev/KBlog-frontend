import React, { useState, useRef } from "react";
import './RegisterWithEmail.css';
import { Asterisk, Eye, EyeSlash } from "@phosphor-icons/react";
import EmailVerificationPopup from "./EmailVerficationPopup";
import { startEmailVerificationConnection } from "../utils/emailVerificationRegister";
import { userService } from "../services/UserService";
import { RegisterFormData } from "../types/RegisterFormData";

const RegisterWithEmail: React.FC = () => {
      const [formData, setFormData] = useState<RegisterFormData>({
            profileImage: null,
            name: "",
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
      });

      const [errors, setErrors] = useState<Record<string, string>>({});
      const [showPopup, setShowPopup] = useState(false);
      const [isLoading, setIsLoading] = useState(false);
      const [showPassword, setShowPassword] = useState(false);
      const [showConfirmPassword, setShowConfirmPassword] = useState(false);
      const [previewImage, setPreviewImage] = useState<string | null>(null); 
      const fileInputRef = useRef<HTMLInputElement>(null); // Ref để trigger input file

      /** Helper function */
      const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      
      const validateForm = () => {
            const newErrors: Record<string, string> = {};

            if(!formData.name.trim()) 
                  newErrors.name = "Name is required";
            if(!formData.username.trim()) 
                  newErrors.name = "Username is required";
            if(!formData.email.trim()) 
                  newErrors.name = "Email is required";
            else if(!validateEmail(formData.email)) 
                  newErrors.email = "Invalid email format";
            if(!formData.password) 
                  newErrors.password = "Password is required";
            if(formData.password !== formData.confirmPassword) 
                  newErrors.confirmPassword = "Password does not match";
            if(!formData.profileImage) 
                  newErrors.profileImage = "Profile image is required";

            setErrors(newErrors);
            return Object.keys(newErrors).length === 0;
      };

      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData({ ...formData, [e.target.name]: e.target.value });
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

      const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if(!file) return;

            const validExtensions = ["image/png", "image/jpg", "image/jpeg"];
            if(!validExtensions.includes(file.type) || file.size > 2*1024*1024) {
                  setErrors({ ...errors, profileImage: "Invalid file! Please PNG, JPG, or JPEG under 2MB"});
                  return;
            }

            setErrors({ ...errors, profileImage: ""});
            setFormData({ ...formData, profileImage: file });
            setPreviewImage(URL.createObjectURL(file));
      };

      const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
            setIsLoading(true); 
            setErrors({});

            if(!navigator.onLine) {
                  setErrors({ global: "Connection lost! Please try again"});
                  setIsLoading(false);
                  return;
            }

            if(!validateForm()) {
                  setIsLoading(false);
                  return;
            }

            try {
                  await userService.registerUser(formData);
                  startEmailVerificationConnection(formData.email);
                  setShowPopup(true);
            } catch (error) {
                  console.log("error: ", error);
                  setErrors({ global: "Cannot connect to API"});
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
                              <div className="password-input">
                                    <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} required />
                                    <button type="button" className="eye-button" onClick={() => setShowPassword(prev => !prev)}>
                                          {showPassword ? <EyeSlash weight="bold" color="blue"/> : <Eye weight="bold" color="blue"/>}
                                    </button>
                              </div>
                        </div>
                        <div className="input-container">
                              <label className="label">
                                    Confirm password
                                    <Asterisk size={8} color="red" weight="bold" className="asterisk-icon"/>
                              </label>
                              <div className="password-input"> 
                                    <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
                                    <button type="button" className="eye-button" onClick={() => setShowConfirmPassword(prev => !prev)}>
                                          {showConfirmPassword ? <EyeSlash weight="bold" color="blue"/> : <Eye weight="bold" color="blue"/>}
                                    </button>
                              </div>
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
