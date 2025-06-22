import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";
import { BaseURL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice"; 
import { useEffect } from "react";

const Body = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    if (userData && userData._id) return;

      try {
        const res = await axios.get(BaseURL + "/profile/view", {
          withCredentials: true,
        })
        dispatch(addUser(res.data))
      } catch (err) {
        if(err.status === 401){
          Navigate("/login");
        }
        console.error("Error fetching user after refresh:", err.message);
      }
    };

  useEffect(() => {
    fetchUser();
  }, [] )

  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Body;
