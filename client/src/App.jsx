import { useState ,useEffect} from 'react'
import Users from './Users'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import CreateUser from './CreateUser'
import axios from 'axios'
import { useDispatch } from'react-redux';
import { getUser } from './redux/userSlice';
import UpdateUser from './UpdateUser';
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000");
        dispatch(getUser(response.data));
      } catch (error) {
        console.error("Error fetching data", error);
      }
    }
    fetchData();
  }, []);
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Users />} />
    <Route path="/create" element={<CreateUser />} />
    <Route path="/edit/:id" element={<UpdateUser />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
