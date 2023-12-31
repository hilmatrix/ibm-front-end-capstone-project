import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import doctorMini from "./DoctorMini.png";
import "./Navbar.css";


const Navbar = ({showProfile}) => {
    const [click, setClick] = useState(false);

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const[email,setEmail]=useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const handleClick = () => setClick(!click);
    const[profileShow,setProfileShow]=useState(false);
    
    const handleLogout = () => {
        sessionStorage.removeItem("auth-token");
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("phone");
        // remove email phone
        localStorage.removeItem("doctorData");
        setIsLoggedIn(false);
        // setUsername("");
       
        // Remove the reviewFormData from local storage
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key.startsWith("reviewFormData_")) {
            localStorage.removeItem(key);
          }
        }
        setEmail('');
        window.location.reload();
    }
    const handleDropdown = () => {
      setShowDropdown(!showDropdown);
    }
    useEffect(() => { 
      const storedemail = sessionStorage.getItem("email");
      const storedname = sessionStorage.getItem("name");

      if (storedemail) {
            setIsLoggedIn(true);
            setUsername(storedemail)
            setName(storedname);
          }
        }, []);

    const profileFunction = () => {
      console.log("Testis");
      //setProfileShow(!profileShow)
      console.log(showProfile )
      showProfile();
    }
  return (
    <nav>
      <div className="nav__logo">
        <Link to="/">
        StayHealthy <i style={{color:'#2190FF'}} className="fa fa-user-md"></i></Link>
        <span>{<img src={doctorMini} style={{width:"40px"}}/>}</span>
      </div>
      <div className="nav__icon" onClick={handleClick}>
        <i className={click ? "fa fa-times" : "fa fa-bars"}></i>
      </div>
      <ul className={click ? 'nav__links active' : 'nav__links'}>
        <li className="link">
          <Link to="/">Home</Link>
        </li>
        <li className="link">
          <Link to="/search/doctors">Find Doctor</Link>
        </li>
        <li className="link">
         <Link to="/instant-consultation">Instant Consultation</Link>
        </li>
        <li className="link">
         <Link to="/appointments">Appointments</Link>
        </li>
        <li className="link">
         <Link to="/reviews">Reviews</Link>
        </li>
        {isLoggedIn?(
          <>
           <li className="welcome" onClick={profileFunction}>Welcome, {name}</li>
            <li className="link">
              <button className="btn2" onClick={handleLogout}>
                Logout
              </button>
            </li>
            
          </>
        ) : (
          <>
            <li className="link">
              <Link to="/signup">
                <button className="btn1">Sign Up</button>
              </Link>
            </li>
            <li className="link">
              <Link to="/login">
                <button className="btn1">Login</button>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
