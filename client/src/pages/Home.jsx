import React, { useState ,useEffect } from 'react';


import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
toast.configure();

const Home = ({ user }) => {
  const [formData, setFormData] = useState({
    userName : user ? user.displayName : '',
    accountId:  user ? user.id : '',
    provider:  user ? user.provider : '',
    name:  user ? user.displayName : '',
    DOB: '',
    age: '',
    skills: '',
    phone:'',
    experience:'',
    education:''
  });
  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      accountId: user ? user.id : '',
      provider: user ? user.provider : '',
      name: user ? user.displayName : '',
    }));
  }, [user]);
  const notify = () => {
    toast(
      `Details Saved`
    );
  };
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
    console.log(formData);
    console.log(user);
    try {
        const headers = user ? {accountId : user.accountId , name : user.displayName } : {};
        const response = await axios.post(`/api/user/save` , formData,  {headers,});
        console.log(response.data);
        notify();
    }
    catch (error) {
        // Handle any errors here
        console.error('Error:', error);
    }   
  };

  if (!user) {
    return <div>Please login to access the resume form.</div>;
  }
  return (
    <div className="home">
      <h1>Resume Form</h1>
      <form onSubmit={handleSubmit}>
        
        <label htmlFor="accountId">Account ID:</label>
        <input type="text" id="accountId" name="accountId" value={user.id}  readOnly  />

        <label htmlFor="provider">Provider:</label>
        <input type="text" id="provider" name="provider" value={user.provider} readOnly  />

        
        <label htmlFor="name">name:</label>
        <input type="text" id="name" name="name" value={user.displayName} readOnly  />

        <label htmlFor="DOB">Date of Birth:</label>
        <input type="date" id="DOB" name="DOB" value={formData.DOB} onChange={handleChange} />

        <label htmlFor="age">Age:</label>
        <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} />

        <label htmlFor="skills">Skills:</label>
        <input type="text" id="skills" name="skills" value={formData.skills} onChange={handleChange} />

        <label htmlFor="phone">phone:</label>
        <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} />

        <label htmlFor="education">education:</label>
        <input type="text" id="education" name="education" value={formData.education} onChange={handleChange} />

        <label htmlFor="experience">experience:</label>
        <input type="text" id="experience" name="experience" value={formData.experience} onChange={handleChange} />

        <button type="submit" className="btn">Submit</button>
      </form>
    </div>
  );
};

export default Home;
