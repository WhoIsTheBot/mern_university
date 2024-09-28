import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './user.css';
import toast from 'react-hot-toast';

const User = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetcData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/users');
        setUsers(response.data);
      } catch (error) {
        console.log('Error while fetching data', error);
      }
    };
    fetcData();
  }, []);

  const deleteUser = async (userId) => {
    await axios
      .delete(`http://localhost:8000/api/delete/user/${userId}`)
      .then((response) => {
        setUsers((prevUser) => prevUser.filter((user) => user._id !== userId));
        toast.success(response.data.message, { position: 'top-right' });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="userTable">
      <Link to="/add" type="button" class="btn btn-warning">
        Add User
        {/* <i class="fa-solid fa-user-plus"></i> */}
      </Link>

      {users.length === 0 ? (
        <div className="noData">
          <h3>No Data to display!</h3>
          <p>Please add New User</p>
        </div>
      ) : (
        <table className="table table-boldered">
          <thead>
            <tr>
              <th scope="col">S.No.</th>
              <th score="col">Name</th>
              <th score="col">Email</th>
              <th score="col">Address</th>
              <th score="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.adress}</td>
                  <td className="action-btn">
                    <Link to={`/update/` + user._id} type="button" className="btn btn-success">
                      <i class="fa-solid fa-pen-to-square"></i>
                    </Link>
                    <button
                      onClick={() => deleteUser(user._id)}
                      type="button"
                      className="btn btn-danger">
                      <i class="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default User;
