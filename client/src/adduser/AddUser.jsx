import React, { useState } from 'react';
import './adduser.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const AddUser = () => {
  const users = {
    name: '',
    email: '',
    adress: '', 
  };

  const [user, setUser] = useState(users);
  const navigate = useNavigate();  

  const inputHandler = (e) => {
    const { name, value } = e.target;

    console.log(name, value);

    setUser({ ...user, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    console.log(user);
    await axios.post("http://localhost:8000/api/user", user)
      .then((response) => {
        toast.success(response.data.message,{position: "top-right"})
        navigate("/");  
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  return (
    <div className="addUser">
      <Link to="/" type="button" className="btn btn-success"> 
        Back
      </Link>

      <h3>New User</h3>
      <form className="addUserForm" onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            onChange={inputHandler}
            name="name"
            autoComplete="off"
            placeholder="Enter your Name"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="email">E-mail:</label>
          <input
            type="text"
            id="email"
            onChange={inputHandler}
            name="email"
            autoComplete="off"
            placeholder="Enter Email"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="adress">Address:</label>  {/* Виправлено 'adress' на 'address' */}
          <input
            type="text"
            id="adress"
            onChange={inputHandler}
            name="adress"
            autoComplete="off"
            placeholder="Enter Address"
          />
        </div>
        <div className="inputGroup">
          <button type="submit" className="btn btn-warning">  {/* className замість class */}
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
