import React from "react";
import profileImage from "../assets/undraw_pic-profile_nr49.svg";
import { MessageCircle } from "lucide-react";
import { Link } from "react-router";
import chatImage from "../assets/chat.png";

const ConnectionCard = ({ connection }) => {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg shadow-md bg-lightFog-100">
      <div className="flex items-center space-x-6">
        <img
          src={connection.photoUrl || profileImage}
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
      <Link
        to={"/chat/" + connection._id}
        className="p-2 rounded-full hover:bg-mutedSteel-100 transition cursor-pointer"
      >
        <img src={chatImage} alt="Chat" className="w-10 h-10  object-cover" />
      </Link>
    </div>
  );
};

export default ConnectionCard;
