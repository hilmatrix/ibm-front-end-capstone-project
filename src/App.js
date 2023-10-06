import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from './Components/Landing_Page/Landing_Page';
import Login from './Components/Login/Login';
import Navbar from './Components/Navbar/Navbar';
import Sign_up from './Components/Sign_up/Sign_up';

function App() {
  return (
        <BrowserRouter>
          <Navbar/>
              <Routes>
                <Route path="/" element={<LandingPage/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<Sign_up/>}/>
              </Routes>
            
        </BrowserRouter>
  );
}
export default App;