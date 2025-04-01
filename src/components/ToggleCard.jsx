import TinderCard from "react-tinder-card";

const FeedCard = ({ user, onSwipe, onCardLeftScreen }) => {
  return (
    <TinderCard
      key={user._id}
      className="absolute w-full h-full shadow-xl rounded-2xl "
      onSwipe={(dir) => onSwipe(dir, user.firstName, user._id)}
      onCardLeftScreen={() => onCardLeftScreen(user.firstName)}
      preventSwipe={["up", "down"]}
    >
      <div
        className="border-2 border-mutedSteel-100 relative w-full h-full bg-cover bg-center rounded-2xl shadow-lg"
        style={{
          backgroundImage: `url("${
            !user.photoUrl || user.photoUrl.trim() === ""
              ? "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"
              : user.photoUrl
          }")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-opacity-30 rounded-2xl"></div>
        <div className="absolute bottom-4 left-4 text-lightFog-100 bg-opacity-30 backdrop-blur-md p-4 rounded-xl shadow-md">
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
  );
};
export default FeedCard;
