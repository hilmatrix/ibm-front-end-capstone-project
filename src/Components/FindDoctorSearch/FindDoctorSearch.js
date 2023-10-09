import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FindDoctorSearch.css';


const initSpeciality = [
    'Dentist', 'Gynecologist/obstetrician', 'General Physician', 'Dermatologist', 'Ear-nose-throat (ent) Specialist', 'Homeopath', 'Ayurveda'
]

const FindDoctorSearch = () => {
    const navigate = useNavigate();
    
    useEffect(() => {
        //const storedUsername = sessionStorage.getItem('email');
        //if (!storedUsername)
        //    navigate(`/login`);
    }, [])
    

    const [doctorResultHidden, setDoctorResultHidden] = useState(true);
    const [searchDoctor, setSearchDoctor] = useState('');
    const [specialities, setSpecialities] = useState(initSpeciality);
    
    const handleDoctorSelect = (speciality) => {
        setSearchDoctor(speciality);
        setDoctorResultHidden(true);
        navigate(`/search/doctors?speciality=${speciality}`);
        window.location.reload();
    }

    let newSpecialities = [];
    const filterSearch = (value) => {
        setSearchDoctor(value);
        if (value == '') {
            setSpecialities(initSpeciality);
            return;
        }
        
        newSpecialities = []
        initSpeciality.map((specialityItem) => {
            if (specialityItem.toLowerCase().includes(value.toLowerCase()))
                newSpecialities.push(specialityItem)
        });
        setSpecialities(newSpecialities);

        console.log(newSpecialities);
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          // 👇 Get input value
          setSpecialities(["Dermatologist"])
          console.log("test")
        }
      };


    
    return (
        <div className='finddoctor'>
            <center>
                <h1>Find a doctor</h1>
                <div>               <i style={{color:'#000000',fontSize:'20rem'}} className="fa fa-user-md"></i>
</div>                <div className="home-search-container"  style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <div className="doctor-search-box">
                    {/* <p>Perform a search to see the results.</p> */}

                        <input type="text" className="search-doctor-input-box" placeholder="Search doctors, clinics, hospitals, etc." 
                        onFocus={() => setDoctorResultHidden(false)} onBlur={() => setDoctorResultHidden(true)} 
                        value={searchDoctor} onChange={(e) => filterSearch(e.target.value)} />
                        
                        <div className="findiconimg"><img className='findIcon' src={process.env.PUBLIC_URL + '/images/search.svg'} 
                            onClick={() => setDoctorResultHidden(false)} alt="" /></div>
                        
                        <div className="search-doctor-input-results" hidden={doctorResultHidden}>
                            {
                                specialities.map(speciality => <div className="search-doctor-result-item" key={speciality} onMouseDown={() => handleDoctorSelect(speciality)}>
                                    <span><img src={process.env.PUBLIC_URL + '/images/search.svg'} alt="" style={{height:"20px", width:"20px"}} width="12" /></span>
                                    <span>{speciality}</span>
                                    <span>SPECIALITY</span>
                                </div>)
                            }
                        </div>
                    </div>
                </div>
            </center>
        </div>
    )
}

export default FindDoctorSearch