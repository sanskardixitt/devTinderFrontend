import axios from "axios";
import React, { useEffect } from "react";
import { BASEURL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";
import ConnectionCard from "./connectionsList";
import BgImage from "../assets/undraw_online-connection_c56e.svg";

const Connections = () => {
  const connections = useSelector(
    (store) => store.connection.connections || []
  );
  const dispatch = useDispatch();
  console.log(connections);

  const fetchConnection = async () => {
    try {
      const res = await axios.get(`${BASEURL}/user/connections`, {
        withCredentials: true,
      });

      dispatch(addConnection(res.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchConnection();
  }, []);

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
          Your Connections
        </h1>
        <div className="space-y-4">
          {connections.length > 0 ? (
            connections.map((connection) => (
              <ConnectionCard key={connection._id} connection={connection} />
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

export default Connections;
