import React, { useState } from "react";
import "./LoginPage.css"; 
import GoogleLogo from "../assets/google.svg";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
      const navigate = useNavigate(); 
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [rememberMe, setRememberMe] = useState(false);
 
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
					<input type="email" className="input-field" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
					<input type="password" className="input-field" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
				</div>

				<div className="remember-forgot">
					<label className="checkbox-container">
						<input type="checkbox" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)}/>
						<span>Remember me</span>
					</label>
					<a href="/forgot-password" className="forgot-link">Forgot password ?</a>
				</div>
				<button className="btn-primary">Login</button>
			
                        <p className="register-login">
                              You do not have any account
                              <a href="/register" className="register-link">   Register now.</a>
                        </p>
                  </div>
            </div>
      );
};

export default LoginPage;
