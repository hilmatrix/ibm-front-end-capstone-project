import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Appointment from './Components/Appointment/Appointment';
import FindDoctor from './Components/FindDoctorSearch/FindDoctor';
import InstantConsultation from './Components/InstantConsultationBooking/InstantConsultation';
import LandingPage from './Components/Landing_Page/Landing_Page';
import Login from './Components/Login/Login';
import Notification from './Components/Notification/Notification';
import ReviewForm from './Components/ReviewForm/ReviewForm';
import Sign_up from './Components/Sign_up/Sign_up';

function App() {
  return (
        <BrowserRouter>
          <Notification>
              <Routes>
                <Route path="/" element={<LandingPage/>}/>
                <Route path="/search/doctors" element={<FindDoctor/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<Sign_up/>}/>
                <Route path="/instant-consultation" element={<InstantConsultation />} />
                <Route path="/appointments" element={<Appointment/>}/>
                <Route path="/reviews" element={<ReviewForm/>}/>
              </Routes>
              </Notification>  
        </BrowserRouter>
  );
}
export default App;