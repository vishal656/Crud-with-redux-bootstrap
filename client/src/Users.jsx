import "bootstrap/dist/css/bootstrap.css";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { deleteUser } from "./redux/userSlice";
import {useDispatch } from "react-redux";
const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/delete/${id}`)
      .then((res) => {dispatch(deleteUser({id}));console.log(res)})
      .catch((err) => console.log(err));
  };
  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <Link className="btn btn-success btn-sm" to="/create">
          Add +
        </Link>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.age}</td>
                  <td>
                    <Link
                      to={`/edit/${user.id}`}
                      className="btn btn-sm btn-success me-2"
                    >
                      Update
                    </Link>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="btn btn-sm btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
