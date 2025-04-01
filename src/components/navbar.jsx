import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import webIcon from "../assets/logo-transparent-svg.svg";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import { BASEURL } from "../utils/constants";
import toast from "react-hot-toast";
import { removeUser } from "../utils/userSlice";

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const [photoUrl, setPhotoUrl] = useState(
    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
  );
  console.log(user);

  useEffect(() => {
    if (user?.photoUrl) {
      setPhotoUrl(user.photoUrl);
    }
  }, [user]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await axios.post(`${BASEURL}/logout`, {}, { withCredentials: true });

      // Show success toast
      toast.success("Logged out successfully!");

      // Clear user state in Redux (if needed)
      dispatch(removeUser()); // Ensure you have a `removeUser` action in your Redux slice

      // Redirect to homepage
      return navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);

      // Show error toast
      toast.error("Failed to log out. Please try again.");
    }
  };

  return (
    <div className="navbar bg-linear-to-b from-deepSky-100 to-darkSlate-100">
      <div className="flex justify-between items-center  w-full">
        <div className="flex gap-1 justify-center items-center">
          <div>
            <Link to="/">
              <img alt="userPhoto" src={webIcon} className="w-60 h-12" />
            </Link>
          </div>
        </div>

        <div className="flex gap-2 justify-center items-center">
          <div className="form-control"></div>
          {user && (
            <div className="dropdown dropdown-end flex gap-2 mx-4 justify-center items-center">
              <div className="px-3">Welcome !! {user.firstName}</div>
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar mx-3"
              >
                <div className="w-10 rounded-full">
                  <img alt="userPhoto" src={photoUrl} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-200 rounded-box z-[1] mt-40 w-56 p-2 shadow"
              >
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                  <Link to="/connections" className="justify-between">
                    connections
                    <span className="badge">New</span>
                  </Link>
                  <Link to="/requests" className="justify-between">
                    Requests
                  </Link>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
