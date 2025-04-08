import io from "socket.io-client";
import { BASEURL } from "./constants";

export const createSocketConnection = () => {
  if (location.hostname === "localhost") {
    return io(BASEURL);
  } else {
    return io("/", { path: "/api/socket.io" });
  }
};
