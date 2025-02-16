import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASEURL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import axios from "axios";
import TinderCard from "react-tinder-card";

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
    <div className="flex justify-center items-center h-screen bg-gradient-to-tl from-deepSky-100 via-mutedSteel-100 to-deepSky-100 border-2 border-darkSlate-100">
      <div className="relative w-80 h-96">
        {feedData && feedData.length > 0 ? (
          feedData.map((user) => (
            <TinderCard
              key={user._id}
              className="absolute w-full h-full shadow-xl rounded-2xl "
              onSwipe={(dir) => onSwipe(dir, user.firstName)}
              onCardLeftScreen={() => onCardLeftScreen(user.firstName)}
              preventSwipe={["up", "down"]}
            >
              <div
                className="relative w-full h-full bg-cover bg-center rounded-2xl shadow-lg"
                style={{
                  backgroundImage: `url(${
                    user.photoUrl || "https://via.placeholder.com/300"
                  })`,
                }}
              >
                <div className="absolute inset-0 bg-deepSky-100 bg-opacity-40 rounded-2xl"></div>

                <div className="absolute bottom-4 left-4 text-lightFog-100 bg-opacity-20 backdrop-blur-lg p-4 rounded-xl shadow-md">
                  <h2 className="text-2xl font-bold drop-shadow-lg">
                    {user.firstName} {user.lastName}, {user.age || "N/A"},
                  </h2>
                  <h3>{user.gender}</h3>
                  <p className="text-sm font-light">{user.about}</p>
                  {user.skills.length > 0 && (
                    <p className="text-xs mt-2 italic">
                      Skills: {user.skills.join(", ")}
                    </p>
                  )}
                </div>
              </div>
            </TinderCard>
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
