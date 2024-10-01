import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginBgImage } from "@assets";
import './login-styles.scss';
import { Typography } from "@mui/material";
import { PJButton, PJInput } from "@components";
import { ButtonPreset } from "@constants";

const LoginPage = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
      navigate('/dashboard');
  };

  return (
    <div className="loginPage__container">
      <div className="loginPage__imageContainer">
        <img src={LoginBgImage} alt="Login Background" className="loginPage__image" />
      </div>
      <div className="loginPage__contentContainer">
        <Typography className="loginPage__title">Welcome Abhijeet</Typography>
        <Typography className="loginPage__subTitle">Press the sign in button to continue</Typography>
        {/* <PJInput
          handleChange={(value) => setUserId(value)} 
          label="Email" 
          placeholder="Enter your email"  
          hasBorder 
          inputFieldClass="loginPage__inputField" 
          containerClass="loginPage__inputContainer" 
          value={userId}
        />
        <PJInput 
          handleChange={(value) => setPassword(value)} 
          label="Password" 
          placeholder="********" 
          hasBorder 
          inputFieldClass="loginPage__inputField"
          value={password}
        /> */}
        <PJButton 
          handleClick={handleLogin} 
          title="Sign In" 
          buttonClass="loginPage__button" 
        />
        <PJButton 
          handleClick={() => {}} 
          title="Sign in with Google" 
          buttonType={ButtonPreset.GreyBackground} 
          buttonClass="loginPage__button" 
        />
      </div>
    </div>
  );
};

export default LoginPage;