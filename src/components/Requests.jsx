import axios from "axios";
import React, { useEffect } from "react";
import { BASEURL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestSlice";
import BgImage from "../assets/undraw_online-connection_c56e.svg";
import RequestCard from "./RequestCard";
const Requests = () => {
  const dispatch = useDispatch();
  const requestConnection = useSelector((store) => store.requests);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASEURL + "/user/requests/received", {
        withCredentials: true,
      });

      console.log("res", res.data.data);

      dispatch(addRequests(res.data.data));
    } catch (error) {
      console.log("Error", error);
    }
  };
  useEffect(() => {
    fetchRequests();
  }, []);

  console.log("requestConnection", requestConnection);

  // if (!requestConnection) return;
  // if (requestConnection.length === 0) return <h1>No connections found </h1>;

  return (
    <div className="min-h-screen">
      {/* Welcome Section */}
      <div className="relative  border-b-1 w-full h-fit flex justify-center items-center border-b-mutedSteel-100">
        <div className="w-full flex justify-center">
          <img
            src={BgImage}
            alt="Welcome"
            className=" object-cover rounded-b-lg w-[25%] "
          />
        </div>
      </div>

      {/* Connections List */}
      <div className="max-w-4xl mx-auto mt-6 p-4">
        <h1 className="text-3xl font-bold text-center mb-4 text-lightFog-100">
          Your Connections Requests
        </h1>
        <div className="space-y-4">
          {requestConnection.length > 0 ? (
            requestConnection.map((connection) => (
              <RequestCard key={connection._id} connection={connection} />
            ))
          ) : (
            <p className="text-center text-lightFog-100">
              No connections found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Requests;
