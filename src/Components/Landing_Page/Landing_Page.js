import React from "react";
import "./Landing_Page.css";

const LandingPage = () => {
  return (
    <section className="hero-section">
      <div>
        <div data-aos="fade-up" className="flex-hero">
            
            <h1>
              {'Your Health '}

              <span className="text-gradient">
                
                Our Responsibility
              </span>
            </h1>
              <div className="blob-cont">
                  <div className="blue blob"></div>
              </div>
              <div className="blob-cont">
                  <div className="blue1 blob"></div>
              </div>
            <h4>
            Medical Consultation Website with Online Appointment Booking feature
            </h4>
            <a href="/search/doctors">
              <button className="button">Find Doctor</button>
            </a>
        </div>

      </div>
    </section>
  );
};

export default LandingPage;
