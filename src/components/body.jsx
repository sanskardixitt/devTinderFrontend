import React, { useEffect } from "react";
import Navbar from "./navbar";
import { Outlet, useNavigate } from "react-router";
import axios from "axios";
import { BASEURL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Toaster, toast } from "react-hot-toast";
import Footer from "./Footer";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userdata = useSelector((store) => store.user);

  const fetchUser = async () => {
    try {
      const res = await axios.get(`${BASEURL}/profile/view`, {
        withCredentials: true,
      });

      if (res.status === 200 && res.data) {
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

  const currentPath = window.location.pathname;
  const showFooter = currentPath === "/login" || currentPath === "/signup";

  return (
    <div>
      <Navbar />
      <Outlet />
      {showFooter && <Footer />}
      <Toaster position="top-right" />
    </div>
  );
};

export default Body;
