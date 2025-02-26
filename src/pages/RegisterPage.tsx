import React from "react";
import "./RegisterPage.css"; // Import CSS file for styling
import GoogleLogo from "../assets/google.svg";
import MailLogo from "../assets/mail.svg";
import { useNavigate } from "react-router-dom";

const RegisterPage: React.FC = () => {
      const navigate = useNavigate(); // hook để điều hướng
 
      const signUpOptions = [
            { name: "Google", icon: GoogleLogo, provider: "google" },
            { name: "Email", icon: MailLogo, provider: "email" },
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
            <div className="register-container">
                  <div className="register-box">
                        <h1 className="register-title">Join KBlog</h1>
                        <div className="gif-container">
                              <video className="gif" autoPlay loop muted>
                                    <source src="/src/assets/welcome.webm" type="video/webm" />
                                    Trình duyệt của bạn không hỗ trợ video.
                              </video>
                        </div>
                        {signUpOptions.map((option) => (
                              <button key={option.provider} className="register-button"
                                    onClick={() => handleSignUp(option.provider)}>
                                    <img src={option.icon} alt={`${option.name} Logo`} className="icon-img" />
                                    Sign up with {option.name}
                              </button>
                        ))}

                        <p className="register-login">
                              Already have an account? 
                              <a href="#" className="register-link">   Log in.</a>
                        </p>
                  </div>
            </div>
      );
};

export default RegisterPage;
