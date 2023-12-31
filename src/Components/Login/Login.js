import React, { useEffect, useState } from 'react';
//Apply css according to your design theme or css that has been given to you in week 2 lab 2

import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

const Login = () => {

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [showEmailError, setShowEmailError] = useState('');
  const [showNameError, setShowNameError] = useState('');
  const [showPhoneError, setShowPhoneError] = useState('');
  const [showPasswordError, setShowPasswordError] = useState('');

  const navigate = useNavigate();
  useEffect(() => {
    if (sessionStorage.getItem("auth-token")) {
      navigate("/")
    }
  }, []);

  const login = async (e) => {
    e.preventDefault();

    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // name: name,
        email:email,
        password: password,
      }),
    });

    const json = await res.json();
    if (json.authtoken) {
      sessionStorage.setItem('auth-token', json.authtoken);
  
      sessionStorage.setItem('email', email);
      sessionStorage.setItem('name', json.name);
      sessionStorage.setItem('phone', json.phone);
      setIsLoggedIn(true);

      navigate('/');
      window.location.reload()
    } else {
          if (json.errors) {
             for (const error of json.errors) {
                 alert(error.msg);
             }
         }
         else {
             if (Array.isArray(json.error)) {
                 json.error.map(errorItem => {
                     switch(errorItem.param) {
                         case "email" : setShowEmailError(errorItem.msg); break;
                         case "password" : setShowPasswordError(errorItem.msg); break;
                     }
                 });
             }
             else {
              setShowPasswordError(json.error); 
             }
         }
    }
    
  };

  return (
    <div>
      <div className="container">
        <div className="login-grid">
          <div className="login-text">
            <h2>Login</h2>
          </div>
          <div className="login-text">
            Are you a new member? <span><Link to="/signup"> Sign Up Here</Link></span>
          </div>
          <br />
          <div className="login-form">
            <form onSubmit={login}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" 
                className="form-control" placeholder="Enter your email" aria-describedby="helpId"/>
                {showEmailError && <div className="err" style={{ color: 'red' }}>{showEmailError}</div>}
                    </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" id="password" 
                className="form-control" placeholder="Enter your password" aria-describedby="helpId"/>
                {showPasswordError && <div className="err" style={{ color: 'red' }}>{showPasswordError}</div>}
            </div>
              <div className="btn-group">
                <button type="submit" className="btn btn-primary mb-2 mr-1 waves-effect waves-light">Login</button>
                <button type="reset" class="btn btn-danger mb-2 waves-effect waves-light">Reset</button>
              </div>
              <div className="login-text">
            
          </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;

