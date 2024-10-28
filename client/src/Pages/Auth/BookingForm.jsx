import React, { useState } from 'react';
import { toast } from "react-toastify";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function BookingForm() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    roomType: "",
    guests: 1,
    checkIn: "",
    checkOut: "",
    adults: 1,
    children: 0,
  });

  const [pickup, setPickup] = useState("");

  const readInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  let navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (user.mobile.length !== 10) {
      toast.error("Mobile number must be 10 digits");
      return;
    }

    try {
      let data = { ...user, pickup };
      const res = await axios.post(`/api/booking/room`, data);
      toast.success(res.data.msg);
      navigate(`/`);
    } catch (err) {
      toast.error(err.response?.data?.msg || err.message);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 text-center">
          <h3 className="display-3 text-success">Booking Form</h3>
        </div>
      </div>
      <div className="row">
        <div className="col-md-10 offset-md-1">
          <div className="card">
            <div className="card-body">
              <form autoComplete="off" onSubmit={submitHandler}>
                <div className="row mt-2">
                  <div className="col-md-6">
                    <label htmlFor="name">Name <span className="text-danger">*</span></label>
                    <input type="text" name='name' value={user.name} onChange={readInput} id='name' className='form-control' required />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="email">Email <span className="text-danger">*</span></label>
                    <input type="email" name='email' value={user.email} onChange={readInput} id='email' className='form-control' required />
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-md-6">
                    <label htmlFor="mobile">Mobile <span className="text-danger">*</span></label>
                    <input type="text" name='mobile' value={user.mobile} onChange={readInput} id='mobile' className='form-control' required maxLength="10" pattern="\d{10}" />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="password">Password <span className="text-danger">*</span></label>
                    <input type="password" name='password' value={user.password} onChange={readInput} id='password' className='form-control' required minLength="6" />
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-md-3">
                    <label htmlFor="roomType">Room Type <span className="text-danger">*</span></label>
                    <select name="roomType" value={user.roomType} onChange={readInput} id="roomType" className="form-control" required>
                      <option value="">Select Room Type</option>
                      <option value="Ac">Ac</option>
                      <option value="Non-Ac">Non-Ac</option>
                      <option value="Deluxe">Deluxe</option>
                      <option value="Cottage">Cottage</option>
                    </select>
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="guests">Number of Guests <span className="text-danger">*</span></label>
                    <input type="number" name='guests' value={user.guests} onChange={readInput} id='guests' className='form-control' required min="1" />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="adults">Adults <span className="text-danger">*</span></label>
                    <input type="number" name='adults' value={user.adults} onChange={readInput} id='adults' className='form-control' required min="1" />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="children">Children <span className="text-danger">*</span></label>
                    <input type="number" name='children' value={user.children} onChange={readInput} id='children' className='form-control' min="0" />
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-md-4">
                    <label htmlFor="checkIn">Check-In Date <span className="text-danger">*</span></label>
                    <input type="datetime-local" name='checkIn' value={user.checkIn} onChange={readInput} id='checkIn' className='form-control' required />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="checkOut">Check-Out Date <span className="text-danger">*</span></label>
                    <input type="datetime-local" name='checkOut' value={user.checkOut} onChange={readInput} id='checkOut' className='form-control' required />
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-md-12">
                    <label>Pickup Service <span className="text-danger">*</span></label>
                  </div>
                  <div className="col-md-6">
                    <input
                      type="radio"
                      name="pickup"
                      value="yes"
                      checked={pickup === "yes"}
                      onChange={() => setPickup("yes")}
                      className="form-check-input"
                      id="pickupYes"
                      required
                    />
                    <label htmlFor="pickupYes" className="form-check-label">Yes, please pick me up on arrival</label>
                  </div>
                  <div className="col-md-6">
                    <input
                      type="radio"
                      name="pickup"
                      value="no"
                      checked={pickup === "no"}
                      onChange={() => setPickup("no")}
                      className="form-check-input"
                      id="pickupNo"
                    />
                    <label htmlFor="pickupNo" className="form-check-label">No Thanks - I will make my own way there</label>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12 text-center">
                    <button type="submit" className="btn btn-success">Submit</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingForm;
