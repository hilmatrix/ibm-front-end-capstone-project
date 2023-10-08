import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FindDoctorSearch from './Components/FindDoctorSearch/FindDoctorSearch';
import InstantConsultation from './Components/InstantConsultationBooking/InstantConsultation';
import LandingPage from './Components/Landing_Page/Landing_Page';
import Login from './Components/Login/Login';
import Notification from './Components/Notification/Notification';
import Sign_up from './Components/Sign_up/Sign_up';

function App() {
  return (
        <BrowserRouter>
          <Notification>
              <Routes>
                <Route path="/" element={<LandingPage/>}/>
                <Route path="/search/doctors" element={<FindDoctorSearch/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<Sign_up/>}/>
                <Route path="/instant-consultation" element={<InstantConsultation />} />
              </Routes>
              </Notification>  
        </BrowserRouter>
  );
}
export default App;