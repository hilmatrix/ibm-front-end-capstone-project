import { useEffect, useState } from 'react';

const AppointmentForm = ({ doctorName, doctorSpeciality, onSubmit }) => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const currentDate = new Date();
    const [date, setDate] = useState(`${currentDate.getFullYear()}-${currentDate.getMonth()}-${currentDate.getDate()}`);
    const [time, setTime] = useState('08:00');
    
    const [selectedSlot, setSelectedSlot] = useState(null);

    const handleSlotSelection = (slot) => {
      setSelectedSlot(slot);
    };
  
    const handleFormSubmit = (e) => {
      e.preventDefault();
      onSubmit({ name, phone:phoneNumber, date, time });
      setName('');
      setPhoneNumber('');
    };
    
    useEffect( () => {
      const storedName = sessionStorage.getItem('name');
      const storedPhone = sessionStorage.getItem('phone');

      setName(storedName);
      setPhoneNumber(storedPhone);
    });

    return (
      <form onSubmit={handleFormSubmit} className="appointment-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            readOnly disabled
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            readOnly disabled
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Data:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => {console.log(e.target.value);setDate(e.target.value)}}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="time">time:</label>
          <input
            type="time"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>
        <button type="submit">Book Now</button>
      </form>
    );
  };

export default AppointmentForm
