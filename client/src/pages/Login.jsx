import Google from "../img/google.png";
import Facebook from "../img/facebook.png";
import twitter from "../img/twitter.png";
import Github from "../img/github.png";
import React, { useState ,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Input from "@material-ui/core/Input";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  input: {
    width: "200px",
    padding: "15px 20px",
    marginBottom: "20px",
    display:"flex",
  },
}));
const Login = ({ user }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
const handleClickShowPassword = () => {
  setShowPassword(!showPassword)
  // setValues({ ...values, showPassword: !values.showPassword });
};
const handleMouseDownPassword = (event) => {
  event.preventDefault();
};
const emailPattern =  /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  const [formData, setFormData] = useState({
    email: '',
    userName:   user ? user.displayName :'',
    accountId:  user ? user.id : '',
    password: '',
    firstName :  '',
    lastName : '',
    provider : ''
  });
  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      accountId: user ? user.id : '',
      provider: user ? user.provider : '',
      userName: user ? user.displayName : '',
    }));
  }, [user]);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle form submission here, e.g., send data to the server
    // You can access form data using formData.email, formData.accountId, etc.
    console.log(user);
    try {
        const headers = user ? {accountId : user.accountId , userName : user.displayName } : {};
        const response = await axios.post(`/api/user/save` , formData,  {headers,});
        console.log(response.data);
        navigate('/');
    }
    catch (error) {
        // Handle any errors here
        console.error('Error:', error);
    }   
  };
  const google = () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };

  const github = () => {
    window.open("http://localhost:5000/auth/github", "_self");
  };
  const facebook = () => {
    window.open("http://localhost:5000/auth/facebook", "_self");
  };
  const twitter = () => {
    window.open("http://localhost:5000/auth/twitter", "_self");
  };
  
 
  return (
    <div className="login">
      <h1 className="loginTitle">Choose a Login Method</h1>
      <div className="wrapper">
        <div className="left">
          <div className="loginButton google" onClick={google}>
            <img src={Google} alt="" className="icon" />
            Google
          </div>
          <div className="loginButton github" onClick={github}>
            <img src={Github} alt="" className="icon" />
            github
          </div>
          <div className="loginButton facebook" onClick={facebook}>
            <img src={Facebook} alt="" className="icon" />
            Facebook
          </div>
          
        </div>
        <div className="center">
          <div className="line" />
          <div className="or">OR</div>
        </div>
        <div className="right">
        <form onSubmit={handleSubmit}>
          <input type="text" name = "userName" placeholder="Username" value={formData.userName}  onChange={handleChange} readOnly={user ? true : false} required />
          <input type="text" name = "firstName"  placeholder="FirstName" value={formData.firstName} onChange={handleChange} required />
          <input type="text" name = "lastName" placeholder="LastName"  value={formData.lastName}  onChange={handleChange} required />
          <input type="text" pattern={emailPattern.source} name = "email" placeholder="Email" value={formData.email}  onChange={handleChange} required />
         
          <Input name = "password"
          placeholder="Password"
                type={showPassword ? "text" : "password"}
                onChange={handleChange}
                value={formData.password}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                        >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                }
                required
                className={classes.input} // Apply custom styles here
                />
              
          <button className="submit">Get Started</button>
        </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
