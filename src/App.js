import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from './Components/Landing_Page/Landing_Page';
import Navbar from './Components/Navbar/Navbar';

function App() {
  return (
        <BrowserRouter>
          <Navbar/>
              <Routes>
                <Route path="/" element={<LandingPage/>}/>
              </Routes>
            
        </BrowserRouter>
  );
}
export default App;