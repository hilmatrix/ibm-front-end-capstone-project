import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';
import './Sign_up.css';

const Sign_up = () => {
    const [role, setRole] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [showerr, setShowerr] = useState('');

    const navigate = useNavigate();

    const register = async (e) => {
        e.preventDefault();
        
        const response = await fetch(`${API_URL}/api/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                role:role,
                name: name,
                email: email,
                password: password,
                phone: phone,

            }),
        });
        
        const json = await response.json();

        if (json.authtoken) {
            sessionStorage.setItem("auth-token", json.authtoken);
            sessionStorage.setItem("role", role);
            sessionStorage.setItem("name", name);
            // phone and email
            sessionStorage.setItem("phone", phone);
            sessionStorage.setItem("email", email);
            // Redirect to home page
            navigate("/");   //on directing to home page you need to give logic to change login and signup buttons with name of the user and logout button where you have implemented Navbar functionality
            window.location.reload();
        } else {
            if (json.errors) {
                for (const error of json.errors) {
                    setShowerr(error.msg);
                }
            } else {
                setShowerr(json.error);
            }
        }
    };

    return (
        <div className="container" style={{marginTop:'5%'}}>
        <div className="signup-grid">
        <div className="signup-form">
        <div className="login-text">
            <h2>Sign Up</h2>
          </div>
        <div className="login-text" style={{marginBottom:"20px"}}>
            Are you already a member? <span><Link to="/login" > Login Here</Link></span>
          </div>
         <form method="POST" onSubmit={register}>
         <div className="form-group">
                <label htmlFor="role">Role</label>
                <select value={role} type="text" onChange={(e) => setRole(e.target.value)} name="select" id="select" className="form-control" placeholder="Select role" aria-describedby="helpId" >
                    <option value="patient">Patient</option>
                    <option value="doctor">Doctor</option>
                </select>
            </div>
         <div className="form-group">
                <label htmlFor="name">Name</label>
                <input value={name} type="text" onChange={(e) => setName(e.target.value)} name="name" id="name" 
                className="form-control" placeholder="Enter your name" aria-describedby="helpId" required/>
            </div>
            <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" name="phone" id="phone" 
                className="form-control" placeholder="Enter your phone number" aria-describedby="helpId" 
                maxlength="10" required/>
            </div>
           <div className="form-group">
                <label htmlFor="email">Email</label>
                 <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" 
                 className="form-control" placeholder="Enter your email" aria-describedby="helpId" required/>
                 {showerr && <div className="err" style={{ color: 'red' }}>{showerr}</div>}
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" 
                id="password" className="form-control" placeholder="Enter your password" aria-describedby="helpId" 
                required/>
            </div>
            <div className="btn-group">
                <button type="submit" className="btn btn-primary mb-2 mr-1 waves-effect waves-light">Sign Up</button>
                <button type="reset" class="btn btn-danger mb-2 waves-effect waves-light">Reset</button>
              </div>
         </form>
         </div>
         </div>
         </div>
 //Sign up role is not stored in database. You can apply logic for this according to your react code.
    );
}

export default Sign_up;
