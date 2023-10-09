import React, { useEffect, useState } from 'react';
import './ReviewForm.css';

class ReviewData {
    constructor(serialNumber, doctorName, doctorSpeciality, name, phone, provideFeedback, reviewGiven) {
        this.serialNumber = serialNumber;
        this.doctorName = doctorName;
        this.doctorSpeciality = doctorSpeciality;
        this.name = name;
        this.phone = phone;
        this.provideFeedback = provideFeedback;
        this.reviewGiven = reviewGiven;
    }
}

function GiveReviews() {
  const [showForm, setShowForm] = useState(false);
  const [disableForm, setDisableForm] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState('');
  const [showWarning, setShowWarning] = useState(false);
  const [rating, setRating] = useState("3")
  const [data, setData] = useState(null)
  const [currentData, setCurrentData] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        review: '',
        rating: "3"
      });

    const [reviewHeader, setReviewHeader] = useState(null);
    const [reviewData, setReviewData] = useState(null);

  const handleButtonClick = (data) => {
    setCurrentData (data);
    setDisableForm(data.reviewGiven)
    console.log(formData)
    setFormData({name : data.reviewName, review : data.reviewText, rating : data.reviewRating});
    setShowForm(true);
  };

  const handleNameChange = (e) => {
    setFormData({name : e.target.value, review : formData.review, rating : formData.rating});
  };

  const handleReviewChange = (e) => {
    setFormData({name : formData.name, review : e.target.value, rating : formData.rating});
  };

  const handleRatingChange = (e) => {
    setFormData({name : formData.name, review : formData.review, rating : e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedMessage(formData);

    let newData = [...data];

    console.log("data = ",data)
    console.log("newData = ",newData)
    console.log("formData = ",formData)

    newData.map(loopData => {
        if (loopData.id == currentData.id) {
            loopData.reviewName = formData.name;
            loopData.reviewText = formData.review;
            loopData.reviewRating = formData.rating;
            loopData.reviewGiven = true;
        }
    });

    console.log("edited newData = ",newData)

    setData(newData);
    localStorage.setItem('appointmentList', JSON.stringify(newData))

    setDisableForm(true)
  };

  useEffect(() => {
        setReviewHeader(new ReviewData("Serial Number", "Doctor Name", "Doctor Speciality", "Patient Name", "Patient Phone", "Provide feedback", "Review given"));

        const storedDoctorData = JSON.parse(localStorage.getItem('appointmentList'));
        setData(storedDoctorData);
    }, []);

    const giveReview = (data) => {
        console.log(data.id,data.reviewGiven)
        handleButtonClick(data);
    };

const closeForm = () => {
    setShowForm(false);
}

  return (
    <div>
        <div className='review-form'>
            <h2>Reviews</h2>
            <table>
                {(reviewHeader && (<tr>
                       <th>{reviewHeader.serialNumber}</th>
                       <th>{reviewHeader.doctorName}</th>
                       <th>{reviewHeader.doctorSpeciality}</th>
                       <th>{reviewHeader.name}</th>
                       <th>{reviewHeader.phone}</th>
                       <th>{reviewHeader.provideFeedback}</th>
                       <th>{reviewHeader.reviewGiven}</th>
                   </tr>))}

                   {(data && data.map( reviewData =>
                   <tr>
                       <td>{reviewData.id}</td>
                       <td>{reviewData.doctorName}</td>
                       <td>{reviewData.speciality}</td>
                       <td>{reviewData.name}</td>
                       <td>{reviewData.phone}</td>
                       <td><button style={reviewData.reviewGiven?{backgroundColor:"darkred"}:{backgroundColor:"green"}} onClick={() => giveReview (reviewData)}>{reviewData.reviewGiven? "Open Review" : "Give Review"}</button></td>
                       <td>{reviewData.reviewGiven?"Yes":"No"}</td>
                   </tr>))}
            </table>
        </div>

          {showForm && (
            <div className='card'>
            <form onSubmit={handleSubmit}>
              <h3>Give Your Feedback</h3>
                   {showWarning && <p className="warning">Please fill out all fields.</p>}
                    <div>
                       <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleNameChange} disabled={disableForm}/>
                 </div>
                    <div>
                     <label htmlFor="review">Review:</label>
                      <textarea id="review" name="review" value={formData.review} onChange={handleReviewChange} disabled={disableForm}/>
                     </div>
                     <label htmlFor="rating">Rating</label>
                     <select value={formData.rating} type="text" name="select" id="rating" className="form-control" placeholder="Select role"  onChange={handleRatingChange} disabled={disableForm}>
                        <option value="1">1 - Bad</option>
                        <option value="2">2 - Poor</option>
                        <option value="3">3 - Okay</option>
                        <option value="4">4 - Very Good</option>
                        <option value="5">5 - Awesome</option>
                    </select>
                     <button type="submit" disabled={disableForm}>Submit</button>
                     <button onClick={closeForm} style={{backgroundColor:"darkRed"}}>Close</button>
                   </form>
                   { (
            <div>
              {disableForm && (<h3>Reviews can only be given once</h3>)}
            </div>
          )}
          </div>   
          )
          
          }
          
        
    </div>
  );
}

export default GiveReviews;
