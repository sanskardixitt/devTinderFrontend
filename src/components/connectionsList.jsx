import React from "react";
import profileImage from "../assets/undraw_pic-profile_nr49.svg";

const ConnectionCard = ({ connection }) => {
  return (
    <div className="flex items-center space-x-6 p-4 border rounded-lg shadow-md bg-lightFog-100">
      <img
        src={connection.photoUrl || profileImage} // Default image if empty
        alt={`${connection.firstName} ${connection.lastName}`}
        className="w-24 h-24 rounded-full object-cover border"
      />
      <div>
        <h3 className="text-xl font-semibold text-darkSlate-100">{`${connection.firstName} ${connection.lastName}`}</h3>
        {connection.age && (
          <p className="text-sm text-darkSlate-100">Age: {connection.age}</p>
        )}
        {connection.gender && (
          <p className="text-sm text-darkSlate-100">
            Gender: {connection.gender}
          </p>
        )}
        <p className="text-sm text-darkSlate-100 mt-2">{connection.about}</p>
        {connection.skills.length > 0 && (
          <div className="mt-2">
            <h4 className=" text-md text-darkSlate-100">Skills:</h4>
            <ul className="flex gap-2 flex-wrap">
              {connection.skills.map((skill, index) => (
                <li
                  key={index}
                  className="bg-gray-200 px-3 py-1 rounded-md text-xs text-deepSky-100"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
export default ConnectionCard;
