import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useCookies } from "react-cookie";

export const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [_, setCookies ] = useCookies(["access_token"]);
  const navigate = useNavigate();
  
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      // use env variable for post request later
      await axios.post("https://joshrecipebook-api.herokuapp.com/auth/register", { username, password });
      
      const response = await axios.post("https://joshrecipebook-api.herokuapp.com/auth/login", { username, password, });

      setCookies("access_token", response.data.token);
      window.localStorage.setItem("userID", response.data.userID);
      navigate("/");

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="register-login-container">
      <form onSubmit={onSubmit}>
        <h2> Register </h2>
        <div className="form-group">
          <label htmlFor="username">Username: </label>
          <input type="text" value={username} id="username" onChange={(event) => setUsername(event.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password: </label>
          <input type="password" value ={password} id="password" onChange={(event) => setPassword(event.target.value)} />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};