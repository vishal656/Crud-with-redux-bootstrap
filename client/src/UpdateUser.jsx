import { useState } from "react";
import axios from "axios"
import { updateUser } from "./redux/userSlice";
import { useDispatch,useSelector } from "react-redux";
import {useNavigate,useParams  } from "react-router-dom";

const UpdateUser = () => {
    const users =useSelector(state=>state.user.users);
    const {id} = useParams();
    const user = users.find(u=>u.id === id);
    console.log("User",user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState(user?.name ||"");
  const [email, setEmail] = useState(user?.email ||"");
  const [age, setAge] = useState(user?.age ||"");

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3000/update/${id}`, { name, email, age })
      .then((res) => {
        dispatch(updateUser({ id, name, email, age }));
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handleUpdate}>
          <h2>Update user</h2>
          <div className="mb-2">
            <label htmlFor="">Name</label>
            <input
              type="text"
              className="form-control"
              required
              placeholder="Enter Name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Email</label>
            <input
              type="text"
              className="form-control"
              required
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Age</label>
            <input
              type="text"
              className="form-control"
              required
              placeholder="Enter Age"
              onChange={(e) => setAge(e.target.value)}
              value={age}
            />
          </div>
          <button className="btn btn-success">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
