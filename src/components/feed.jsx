import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASEURL } from "../utils/constants";
import { addFeed, removefeed } from "../utils/feedSlice";
import axios from "axios";
import FeedCard from "./ToggleCard";
import { toast, Toaster } from "react-hot-toast"; // Importing react-hot-toast

const Feed = () => {
  const dispatch = useDispatch();
  const feedData = useSelector((store) => store.feed);

  // Fetch feed data
  const getFeed = async () => {
    try {
      const res = await axios.get(`${BASEURL}/user/feed`, {
        withCredentials: true,
      });

      // Only update Redux if feed data has changed
      if (JSON.stringify(feedData) !== JSON.stringify(res.data.data)) {
        dispatch(addFeed(res.data.data));
      }
    } catch (error) {
      console.error("Error fetching feed:", error);
    }
  };

  // Trigger feed data fetching only once (or when feedData is empty)
  useEffect(() => {
    if (!feedData || feedData.length === 0) {
      getFeed();
    }
  }, [feedData, dispatch]);

  if (!feedData || feedData.length === 0) {
    return (
      <h1 className="text-2xl flex justify-center items-centers">
        No users found
      </h1>
    );
  }

  const onSwipe = async (direction, name, _id) => {
    console.log(`${name} swiped ${direction}`);
    try {
      const status = direction === "left" ? "ignored" : "interested";
      const url = `${BASEURL}/request/send/${status}/${_id}`;

      const res = await axios.post(url, {}, { withCredentials: true });

      dispatch(removefeed(_id));

      if (status === "ignored") {
        toast.success(`You have rejected ${name}'s request`);
      } else {
        toast.success(`You have sent a connection request to ${name}`);
      }
    } catch (error) {
      toast.error("Error during swipe, please try again!");
      console.error(
        "Error during swipe:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const onCardLeftScreen = (name) => {
    console.log(`${name} left the screen`);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-deepSky-100 via-mutedSteel-100 to-oceanBlue-100 border-2 border-darkSlate-100 overflow-hidden">
      <div className="relative w-80 h-96">
        {feedData && feedData.length > 0 ? (
          feedData.map((user) => (
            <FeedCard
              key={user._id}
              user={user}
              onSwipe={onSwipe}
              onCardLeftScreen={onCardLeftScreen}
            />
          ))
        ) : (
          <p className="text-center text-lightFog-100 text-lg animate-pulse">
            Loading...
          </p>
        )}
      </div>
      <Toaster />{" "}
      {/* Add this Toaster component to render the toast notifications */}
    </div>
  );
};

export default Feed;
