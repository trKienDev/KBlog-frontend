import React from "react";
import "./RegisterPage.css"; // Import CSS file for styling
import GoogleLogo from "../assets/google.svg";
import EmailLogo from "../assets/gmail.svg";

const RegisterPage: React.FC = () => {
      const signUpOptions = [
            { name: "Google", icon: GoogleLogo, provider: "google" },
            { name: "Email", icon: EmailLogo, provider: "email" },
      ];

      const handleSignUp = (provider: string) => {
            console.log(`Signing up with ${provider}`);
            // Gọi API xử lý đăng ký tại đây
      };

      return (
            <div className="register-container">
                  <div className="register-box">
                        <h1 className="register-title">Join KBlog</h1>
                        <p className="register-subtitle">Welcome to my blog</p>

                        {signUpOptions.map((option) => (
                              <button key={option.provider}
                                          className="register-button"
                                          onClick={() => handleSignUp(option.provider)}>
                                    {option.provider === "google" || option.provider === "email" ? (
                                          <img src={option.icon} alt={`${option.name} Logo`} className="icon-img" />
                                    ) : (
                                          <span>{option.icon}</span>
                                    )}
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
