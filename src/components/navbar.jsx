import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import webIcon from "../assets/logo-transparent-svg.svg";

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

  return (
    <div className="navbar bg-linear-to-b from-deepSky-100 to-darkSlate-100">
      <div className="flex justify-between items-center  w-full">
        <div className="flex gap-1 justify-center items-center">
          <div>
            <img alt="userPhoto" src={webIcon} className="w-60 h-12" />
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
                className="menu menu-sm dropdown-content bg-base-200 rounded-box z-[1] mt-10 w-56 p-2 shadow"
              >
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a>Logout</a>
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
