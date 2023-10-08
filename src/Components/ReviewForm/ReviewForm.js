import React, { useState } from 'react';
import './ReviewForm.css';

function GiveReviews() {
  const [showForm, setShowForm] = useState(false);
  const [disableForm, setDisableForm] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState('');
  const [showWarning, setShowWarning] = useState(false);
  const [formData, setFormData] = useState({
        name: '',
        review: '',
        rating: 0
      });

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
  return (
    <div className='card'>
      <h2>Form with Message</h2>
      {!showForm ? (
        <button onClick={handleButtonClick}>Open Form</button>
      ) : (
        <form onSubmit={handleSubmit}>
          <h2>Give Your Feedback</h2>
               {showWarning && <p className="warning">Please fill out all fields.</p>}
                <div>
                   <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} disabled={disableForm}/>
             </div>
                <div>
                 <label htmlFor="review">Review:</label>
                  <textarea id="review" name="review" value={formData.review} onChange={handleChange} disabled={disableForm}/>
                 </div>
                 <label htmlFor="rating">Rating</label>
                 <select value="rating_5" type="text" name="select" id="rating" className="form-control" placeholder="Select role"  disabled={disableForm}>
                    <option value="rating_5">5 - Awesome</option>
                </select>
                 <button type="submit" disabled={disableForm}>Submit</button>

               </form>
      )}
      {submittedMessage && (
        <div>
          <h3>Reviews can only be given once</h3>
        </div>
      )}
    </div>
  );
}

export default GiveReviews;
