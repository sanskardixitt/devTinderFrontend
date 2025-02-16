import React, { useEffect } from "react";
import Navbar from "./navbar";
import { Outlet, useNavigate } from "react-router";
import axios from "axios";
import { BASEURL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Toaster, toast } from "react-hot-toast";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userdata = useSelector((store) => store.user);
  const fetchUser = async () => {
    if (userdata == null) {
      return;
    }
    try {
      const res = await axios.get(`${BASEURL}/profile/view`, {
        withCredentials: true,
      });

      if (res.status === 200 && res.data) {
        console.log("u", res.data);
        dispatch(addUser(res.data));
      } else {
        throw new Error("Invalid user data");
      }
    } catch (error) {
      console.error(
        "User fetch failed:",
        error.response?.data || error.message
      );

      navigate("/login");
    }
  };

  useEffect(() => {
    if (!userdata) fetchUser();
  }, []);

  return (
    <div>
      <Navbar />
      <Outlet />
      <Toaster position="top-right" />
    </div>
  );
};

export default Body;
