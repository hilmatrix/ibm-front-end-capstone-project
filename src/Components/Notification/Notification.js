import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import "./Notification.css";

const Notification = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [doctorData, setDoctorData] = useState(null);
  const [appointmentData, setAppointmentData] = useState(null);


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
  return (
    <div>
      <Navbar ></Navbar>
      {children}
      {isLoggedIn && appointmentData && (
        <>
          <div className="appointment-card">
            <div className="appointment-card__content">
              <h3 className="appointment-card__title">Appointment Details</h3>
              <p className="appointment-card__message">
                <strong>Doctor:</strong> {doctorData?.name} 
              </p>
              <p className="appointment-card__message">
                <strong>Speciality:</strong> {doctorData?.speciality}
              </p>
              <p className="appointment-card__message">
                <strong>Patient:</strong> {name}
              </p>  
              <p className="appointment-card__message">
                <strong>Phone:</strong> {phone}
              </p>  
              <p className="appointment-card__message">
                <strong>Date:</strong> <input type="date" id="appointment" name="appointment" value = "2023-09-30" readOnly/>
              </p>  
              <p className="appointment-card__message">
                <strong>Time:</strong> <input type="time" value="08:00" readOnly/>
              </p>  
            </div>
          </div>
        </>
      )}

    </div>
  );
};

export default Notification;
