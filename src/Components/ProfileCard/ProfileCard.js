import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config";
import "./ProfileCard.css";

const ProfileCard = () => {
  const [userDetails, setUserDetails] = useState({});

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

 const [updatedDetails, setUpdatedDetails] = useState({});
 const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const storedName = sessionStorage.getItem('name')
    const storedPhone = sessionStorage.getItem('phone')
    const storedEmail = sessionStorage.getItem('email')

    setName(storedName);
    setPhone(storedPhone);
    setEmail(storedEmail);

    const authtoken = sessionStorage.getItem("auth-token");
    if (!authtoken) {
      navigate("/login");
    } else {
      fetchUserProfile();
    }
  }, [navigate]);
  const fetchUserProfile = async () => {
    try {
      const authtoken = sessionStorage.getItem("auth-token");
      const email = sessionStorage.getItem("email"); // Get the email from session storage
  if (!authtoken) {
    navigate("/login");
  } else {
    const response = await fetch(`${API_URL}/api/auth/user`, {
      headers: {
        "Authorization": `Bearer ${authtoken}`,
        "Email": email, // Add the email to the headers
      },
    });
    if (response.ok) {
      const user = await response.json();
      setUserDetails(user);
      setUpdatedDetails(user);
    } else {
      // Handle error case
      throw new Error("Failed to fetch user profile");
    }
  }
} catch (error) {
  console.error(error);
  // Handle error case
}
};

const handleEdit = () => {
setEditMode(true);
};
const handleInputChange = (e) => {
setUpdatedDetails({
  ...updatedDetails,
  [e.target.name]: e.target.value,
});

};
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const authtoken = sessionStorage.getItem("auth-token");
    const email = sessionStorage.getItem("email"); // Get the email from session storage

    sessionStorage.setItem("name", name);
    console.log("ProfileCard new name = ", name);

    if (!authtoken || !email) {
      navigate("/login");
      return;
    }
    updatedDetails.name = name;
    updatedDetails.phone = phone;

    const payload = { ...updatedDetails };
    const response = await fetch(`${API_URL}/api/auth/user`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${authtoken}`,
        "Content-Type": "application/json",
        "Email": email,
      },
      body: JSON.stringify(payload),
    });
    if (response.ok) {
      // Update the user details in session storage
      sessionStorage.setItem("name", updatedDetails.name);
      sessionStorage.setItem("phone", updatedDetails.phone);
      setUserDetails(updatedDetails);
      setEditMode(false);
      // Display success message to the user
      alert(`Profile Updated Successfully!`);
      window.location.reload();
    } else {
      // Handle error case
      throw new Error("Failed to update profile");
    }
  } catch (error) {
    console.error(error);
    // Handle error case
  }
};
return (
<div className="profileCard">
  {editMode ? (
<form onSubmit={handleSubmit}>
<label>
  Name
  <input
    type="text"
    name="name"
    value={name}
    onChange={(e) => setName(e.target.value)}
  />
</label>
<label>
  Phone
  <input
    type="text"
    name="phone"
    value={phone}
    onChange={(e) => setPhone(e.target.value)}
  />
</label>
<div className="emailDisabled">
<label>
  Email
  <input
    type="email"
    name="email"
    value={userDetails.email}
    disabled // Disable the email field
  />
</label>
</div>

<button type="submit">Save</button>
</form>
) : (
<div className="profile-details">
<h1>Welcome, {userDetails.name}</h1>
<p>{`Phone : ${phone}`}</p>
<p>{`Email : ${email}`}</p>
<button onClick={handleEdit}>Edit</button>
</div>
)}
</div>
);
};
export default ProfileCard;
