import axios from "axios";
import React, { useEffect } from "react";
import { BASEURL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

const Connections = () => {
  const connection = useSelector((store) => store.connection);
  const dispatch = useDispatch();
  const fetchConnection = async () => {
    try {
      const res = await axios.get(`${BASEURL}/user/connections`, {
        withCredentials: true,
      });
      console.log("res", res);
      dispatch(addConnection(res.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchConnection();
    console.log("f", connection);
  }, []);
  return <div>connections</div>;
};

export default Connections;
