import React from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { BASEURL } from "../utils/constants";
import { removeRequest } from "../utils/requestSlice";
import profileImage from "../assets/undraw_pic-profile_nr49.svg";

const RequestCard = ({ connection }) => {
  const dispatch = useDispatch();
  const user = connection?.fromUserId || {};

  const handleChangeStatus = async (status, _id) => {
    const res = await axios.post(
      BASEURL + "/request/view/" + status + "/" + _id,
      {},
      {
        withCredentials: true,
      }
    );

    dispatch(removeRequest(_id));
  };

  return (
    <div className="flex items-center space-x-6 p-4 border rounded-lg shadow-md bg-white">
      <img
        src={user.photoUrl || profileImage}
        alt={`${user.firstName || "Unknown"} ${user.lastName || "User"}`}
        className="w-24 h-24 rounded-full object-cover border"
      />
      <div className="flex-1">
        <h3 className="text-xl font-semibold text-darkSlate-100">
          {`${user.firstName || "Unknown"} ${user.lastName || "User"}`}
        </h3>
        {user.age && (
          <p className="text-sm text-darkSlate-100">Age: {user.age}</p>
        )}
        {user.gender && (
          <p className="text-sm text-darkSlate-100">Gender: {user.gender}</p>
        )}
        <p className="text-sm text-darkSlate-100 mt-2">
          {user.about || "No information available."}
        </p>

        {Array.isArray(user.skills) && user.skills.length > 0 ? (
          <div className="mt-2">
            <h4 className="font-semibold text-sm">Skills:</h4>
            <ul className="flex gap-2 flex-wrap">
              {user.skills.map((skill, index) => (
                <li
                  key={index}
                  className="bg-gray-200 px-3 py-1 rounded-md text-xs"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-sm text-darkSlate-100">No skills listed.</p>
        )}

        {/* Buttons for Accept & Reject */}
        <div className="flex gap-4 mt-4">
          <button
            onClick={() => handleChangeStatus("accepted", connection._id)}
            className="btn btn-success text-lightFog-100"
          >
            Accept
          </button>
          <button
            onClick={() => handleChangeStatus("rejected", connection._id)}
            className="btn btn-error text-lightFog-100"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestCard;
