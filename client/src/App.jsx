import Navbar from "./components/Navbar";
import "./app.css";
import Home from "./pages/Home";

import Login from "./pages/Login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import NotFoundPage from './pages/NotFoundPage';
const App = () => {
  const [user, setUser] = useState(null);
  // const [password, setPassword] = useState('');
  useEffect(() => {
    const getUser = () => {
      fetch("http://localhost:5000/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          setUser(resObject.user);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    
    
    getUser();
    
  }, []);

  return (
    <BrowserRouter>
      <div>
        <Navbar user={user} />
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route
            path="/login"
            element={  <Login user = {user} />}
          />
          
          <Route path="*" element ={<NotFoundPage/>}/>
        </Routes>
        
      </div>
    </BrowserRouter>
  );
};

export default App;
