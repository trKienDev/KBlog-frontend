import React, { useState } from "react";
import "./LoginPage.css"; 
import GoogleLogo from "../assets/google.svg";
import { useNavigate } from "react-router-dom";
import { LoginFormData } from "../types/LoginFormData";
import { Eye, EyeSlash } from "@phosphor-icons/react";
import { userService } from "../services/UserService";

const LoginPage: React.FC = () => {
      const [formData, setFormData ] = useState<LoginFormData>({
            email: "",
            password: "",
      });

      const navigate = useNavigate(); 
	const [showPassword, setShowPassword] = useState(false);
	const [rememberMe, setRememberMe] = useState(false);
      const [errors, setErrors] = useState<Record<string, string>>({});

      /** Helper function */
      const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      const validateForm = () => {
            const newErrors: Record<string, string> = {};

            if(!validateEmail(formData.email)) {
                  newErrors.email = "Invalid email format";
            }

            setErrors(newErrors);
            return Object.keys(newErrors).length === 0;
      };

      const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
            setFormData({ ...formData, [e.target.name]: e.target.value});
      };

      const handleSubmit = async (e:React.FormEvent) => {
            e.preventDefault();
            setErrors({});

            if(!navigator.onLine) {
                  setErrors({ global: "Connection lost! Please try again" });
                  return;
            }

            if(!validateForm()) {
                  return;
            }

            try {
                  const response = await userService.LoginUser(formData);
                  console.log("response: ", response);
            } catch (error) {
                  const err = error as Error;
                  console.error("error in Login page: ", err.message);
                  setErrors({ global: "Cannot connect to API"});
            }
      }

      const signUpOptions = [
            { name: "Google", icon: GoogleLogo, provider: "google" },
      ];
	
      const handleSignUp = (provider: string) => {
            console.log(`Signing up with ${provider}`);
            
            if(provider === "email") {
                  navigate("/register/email");
            } else {
                  console.log(`Processing ${provider} signup...`);
            }
      };

      return (
            <div className="login-container">
                  <div className="login-box">
                        <h1 className="login-title">Log in in your account</h1>
                        <p className="login-subtitle">Nice to see you again</p>
                        <div className="gif-container">
                              <video className="gif" autoPlay loop muted>
                                    <source src="/src/assets/welcome.webm" type="video/webm" />
                                    Trình duyệt của bạn không hỗ trợ video.
                              </video>
                        </div>
                        {signUpOptions.map((option) => (
                              <button key={option.provider} className="btn-secondary"
                                    onClick={() => handleSignUp(option.provider)}>
                                    <img src={option.icon} alt={`${option.name} Logo`} className="icon-img" />
                                    Continue with {option.name}
                              </button>
                        ))}

				<div className="separator">
					<hr className="line"/>
					<span>OR</span>
					<hr className="line"/>
				</div>

				<div className="login-form">
                              <form onSubmit={handleSubmit}>
                                    <input type="email" className="input-field" placeholder="Email" name="email" value={formData.email} onChange={handleChange} required/>
                                    {errors.email && <p className="error-message">{errors.email}</p>}
                                    <div className="password-input">
                                          <input type={showPassword ? "tetx" : "password"} name="password" className="input-field" placeholder="Password" value={formData.password} onChange={handleChange} required/>
                                          <button type="button" className="eye-button" onClick={() => setShowPassword(prev => !prev)}>
                                                {showPassword ? <EyeSlash weight="bold" color="blue" /> : <Eye weight="bold" color="blue" />}
                                          </button>
                                    </div>
                                    <div className="remember-forgot">
                                          <label className="checkbox-container">
                                                <input type="checkbox" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)}/>
                                                <span>Remember me</span>
                                          </label>
                                          <a href="/forgot-password" className="forgot-link">Forgot password ?</a>
                                    </div>
                                    {errors.global && <p className="error-message">{errors.global}</p>}
                                    <button className="btn-primary">Login</button>
                              </form>
				</div>
			
                        <p className="register-login">
                              You do not have any account
                              <a href="/register" className="register-link">   Register now.</a>
                        </p>
                  </div>
            </div>
      );
};

export default LoginPage;
