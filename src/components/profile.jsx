import { useState } from "react";
import StaticFeedCard from "./profileCard";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASEURL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import { toast } from "react-hot-toast";

export default function ProfileUpdateForm() {
  const user = useSelector((store) => store.user);
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [gender, setGender] = useState(user.gender || "");
  const [age, setAge] = useState(user.age || "");
  const [about, setAbout] = useState(user.about || "");
  const [skills, setSkills] = useState(user.skills || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleUpdate = async () => {
    if (!firstName || !lastName || !gender || !age || !about) {
      toast.error("All fields except photo URL are required.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.patch(
        `${BASEURL}/profile/edit`,
        {
          firstName,
          lastName,
          gender,
          age,
          about,
          photoUrl,
          skills,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center pt-4">
      <div className="mx-4 p-1 my-2 mt-5 w-[70%]">
        <div className="card lg:card-side bg-linear-to-bl from-deepSky-100 via-mutedSteel-100 to-lightFog-100 shadow-xl p-6 rounded-3xl border-2 border-mutedSteel-100">
          <figure className="lg:w-[50%] md:w-44 sm:w-40 flex justify-center items-center p-4">
            <StaticFeedCard
              user={{
                firstName,
                lastName,
                skills,
                age,
                about,
                photoUrl,
                gender,
              }}
            />
          </figure>

          <div className="card-body w-full flex flex-col items-center">
            <h2 className="text-2xl font-bold text-center mb-6 text-darkSlate-100">
              Update Your Profile
            </h2>
            <div className="w-full max-w-md space-y-4">
              <input
                type="text"
                placeholder="First Name"
                className="input input-bordered w-full"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="input input-bordered w-full"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <select
                className="input input-bordered w-full"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Other</option>
              </select>
              <input
                type="number"
                placeholder="Age"
                className="input input-bordered w-full"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
              <textarea
                placeholder="About"
                className="input input-bordered w-full"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
              <input
                type="text"
                placeholder="Skills (comma separated)"
                className="input input-bordered w-full"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
              />
              <input
                type="text"
                placeholder="Photo URL"
                className="input input-bordered w-full"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
              />

              <div className="w-full flex justify-center items-center">
                <button
                  className={`btn btn-wide ${
                    loading
                      ? "opacity-50 cursor-not-allowed"
                      : "bg-deepSky-100 text-white"
                  }`}
                  onClick={handleUpdate}
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Update Profile"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
