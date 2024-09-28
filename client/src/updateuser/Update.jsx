import React, { useEffect, useState } from 'react';
import './updateuser.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Update = () => {
  const users = {
    name: '',
    email: '',
    adress: '', 
  };

  const [user, setUser] = useState(users);
  const navigate = useNavigate();  
  const {id} = useParams();

  const inputHandler = (e) => {
    const { name, value } = e.target;

    console.log(name, value);

    setUser({ ...user, [name]: value });
  };

  useEffect(()=>{
    axios.get(`http://localhost:8000/api/user/${id}`)
    .then((response) => {
      setUser(response.data)
    })
    .catch((error) => {
      console.log(error)
    })
  },[id]);

  const submitForm = async (e) => {
    e.preventDefault();
    console.log(user);
    await axios.put(`http://localhost:8000/api/update/user/${id}`, user)
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

      <h3>Update User</h3>
      <form className="addUserForm" onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={user.name}
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
            value={user.email}
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
            value={user.adress}
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

export default Update;

















// Продовжити
// 1:42:12