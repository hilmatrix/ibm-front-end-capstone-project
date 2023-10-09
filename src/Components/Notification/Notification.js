import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import ProfileCard from "../ProfileCard/ProfileCard";
import "./Notification.css";

const Notification = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [doctorData, setDoctorData] = useState(null);
  const [appointmentData, setAppointmentData] = useState(null);
  const[profileShow,setProfileShow]=useState(false);


  useEffect(() => {
    const storedName = sessionStorage.getItem('name');
    const storedPhone = sessionStorage.getItem('phone');

    setName(storedName);
    setPhone(storedPhone);

    const storedUsername = sessionStorage.getItem('email');
    const storedDoctorData = JSON.parse(localStorage.getItem('doctorData'));

    if (storedDoctorData == null)
        return;

    const storedAppointmentData = storedDoctorData?.name;

    console.log("Notification use effect");
    console.log(storedDoctorData.name)
    console.log("Notification storedDoctorData = ", storedDoctorData)
    console.log("Notification storedAppointmentData = ", storedAppointmentData)

    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }

    if (storedDoctorData) {
      setDoctorData(storedDoctorData);
    }

    if (storedAppointmentData) {
      setAppointmentData(storedAppointmentData);
    }
  }, []);

  const showProfile = () => {
    setProfileShow(!profileShow);
  }

  return (
    <div>
      <Navbar showProfile={showProfile}></Navbar>
      {profileShow && (<ProfileCard></ProfileCard>)}
      
      {children}
      {isLoggedIn && appointmentData && (
        <>
          <div className="appointment-card">
            <div className="appointment-card__content">
              <h3 className="appointment-card__title">Appointment Details</h3>
              <p className="appointment-card__message">
                <strong>Doctor:</strong> {doctorData?.doctorName} 
              </p>
              <p className="appointment-card__message">
                <strong>Speciality:</strong> {doctorData?.speciality}
              </p>
              <p className="appointment-card__message">
                <strong>Patient:</strong> {doctorData?.doctorName}
              </p>  
              <p className="appointment-card__message">
                <strong>Phone:</strong> {phone}
              </p>  
              <p className="appointment-card__message">
                <strong>Date:</strong> <input type="date" id="appointment" name="appointment" value={doctorData?.date} readOnly/>
              </p>  
              <p className="appointment-card__message">
                <strong>Time:</strong> <input type="time" value={doctorData?.time} readOnly/>
              </p>  
            </div>
          </div>
        </>
      )}

    </div>
  );
};

export default Notification;
