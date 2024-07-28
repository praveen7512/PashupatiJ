import { LoginBgImage } from "@assets";

import './login-styles.scss';
import { Typography } from "@mui/material";
import { PJButton, PJInput } from "@components";
import { ButtonPreset } from "@constants";

const LoginPage = () => {
  return (
    <div className="loginPage__container">
      <div className="loginPage__imageContainer">
      <img src={LoginBgImage} alt="Login Background" className="loginPage__image" />
      </div>
      <div className="loginPage__contentContainer">
        <Typography>Welcome Abhijeet</Typography>
        <Typography>Please enter your details below:</Typography>
        <PJInput handleChange={()=>{}} label="Email" placeholder="Enter your email"  hasBorder inputFieldClass="loginPage__inputField" containerClass="loginPage__inputContainer" />
        <PJInput handleChange={()=>{}} label="Password" placeholder="********" hasBorder inputFieldClass="loginPage__inputField" />
        <PJButton handleClick={()=>{}} title="Sign In" buttonClass="loginPage__button" />
        <PJButton handleClick={()=>{}} title="Sign in with Google" buttonType={ButtonPreset.GreyBackground} buttonClass="loginPage__button" />
      </div>
    </div>
  )
}

export default LoginPage;
