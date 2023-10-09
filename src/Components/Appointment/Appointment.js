import React, { useEffect, useState } from 'react';
import './Appointment.css';

class AppointmentData {
    constructor(serialNumber, doctorName, doctorSpeciality, name, phone, date, time) {
        this.serialNumber = serialNumber;
        this.doctorName = doctorName;
        this.doctorSpeciality = doctorSpeciality;
        this.name = name;
        this.phone = phone;
        this.date = date;
        this.time = time;
    }
}

function Appointment() {
  const [showForm, setShowForm] = useState(false);
  const [disableForm, setDisableForm] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState('');
  const [showWarning, setShowWarning] = useState(false);
  const [formData, setFormData] = useState({
        name: '',
        review: '',
        rating: 0
      });

    const [header, setHeader] = useState(null);
    const [data, setData] = useState(null);

  const handleButtonClick = () => {
    setShowForm(true);
  };

  const handleChange = (e) => {
    setFormData(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setDisableForm(true);
    setSubmittedMessage(formData);
    setFormData('');
        if (formData.name && formData.review && formData.rating > 0) {
          //setShowWarning(false);
        } else {
          //setShowWarning(true);
        }
  };

  useEffect(() => {
        setHeader(new AppointmentData("Serial Number", "Doctor Name", "Doctor Speciality", "Patient Name", "Patient Phone", "Date", "Time"));

        const storedAppointmentData = JSON.parse(localStorage.getItem('appointmentList'));
        setData(storedAppointmentData);

        //setData(new AppointmentData(storedDoctorData?.id, storedDoctorData?.doctorName, "Doctor Speciality", "Provide feedback", "Review given"));
    }, []);

    const clear = () => {
      localStorage.setItem('appointmentList', null);
      localStorage.setItem('doctorData', null);
      window.location.reload();
    };

  return (
    <div className='appointments'>
       <table>
                {(header && (<tr>
                       <th>{header.serialNumber}</th>
                       <th>{header.doctorName}</th>
                       <th>{header.doctorSpeciality}</th>
                       <th>{header.name}</th>
                       <th>{header.phone}</th>
                       <th>{header.date}</th>
                       <th>{header.time}</th>
                   </tr>))}

                   {(data && data.map (appointment =>
                   <tr>
                       <td>{appointment.id}</td>
                       <td>{appointment.doctorName}</td>
                       <td>{appointment.speciality}</td>
                       <td>{appointment.name}</td>
                       <td>{appointment.phone}</td>
                       <td>{appointment.date}</td>
                       <td>{appointment.time}</td>
                   </tr>))}
            </table>
            <button onClick={clear}>Remove all appointments</button>
    </div>
  );
}

export default Appointment;
