import Google from "../img/google.png";
import Facebook from "../img/facebook.png";
import twitter from "../img/twitter.png";
import Github from "../img/github.png";
import React, { useState ,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ user }) => {
  const navigate = useNavigate();
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
          <input type="text" name = "userName" placeholder="Username" value={user?user.displayName:''}readOnly={user ? true : false} onChange={handleChange} />
          <input type="text" name = "firstName"  placeholder="FirstName" value={formData.firstName} onChange={handleChange} required />
          <input type="text" name = "lastName" placeholder="LastName"  value={formData.lastName}  onChange={handleChange} required />
          <input type="text" name = "email" placeholder="Email" value={formData.email}  onChange={handleChange} required />
          <input type="text" name = "password" placeholder="Password" value={formData.password}  onChange={handleChange} required />
          <button className="submit">Get Started</button>
        </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
