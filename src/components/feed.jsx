import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASEURL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import axios from "axios";
import FeedCard from "./ToggleCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feedData = useSelector((store) => store.feed);

  useEffect(() => {
    const getFeed = async () => {
      try {
        const res = await axios.get(`${BASEURL}/user/feed`, {
          withCredentials: true,
        });
        dispatch(addFeed(res.data.data));
      } catch (error) {
        console.error("Error fetching feed:", error);
      }
    };

    if (!feedData || feedData.length === 0) {
      getFeed();
    }
  }, [feedData, dispatch]);

  const onSwipe = (direction, name) => {
    console.log(`${name} swiped ${direction}`);
  };

  const onCardLeftScreen = (name) => {
    console.log(`${name} left the screen`);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-deepSky-100 via-mutedSteel-100 to-oceanBlue-100 border-2 border-darkSlate-100">
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
    </div>
  );
};

export default Feed;
