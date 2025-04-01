import React, { useState } from "react";
import SignupImage from "../assets/undraw_social-friends_b0ay.svg";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import { BASEURL } from "../utils/constants";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!firstName || !lastName || !emailId || !password) {
      toast.error("All fields are required.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `${BASEURL}/signup`,
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );

      if (res.status === 200) {
        toast.success("Signup successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        toast.error("Something went wrong, please try again.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center pt-4">
        <div className="mx-4 p-1 my-2 mt-5 w-[70%]">
          <div className="card lg:card-side bg-linear-to-bl from-deepSky-100 to-lightFog-100 shadow-xl">
            <figure className="lg:w-[50%] md:w-44 sm:w-40">
              <img
                src={SignupImage}
                alt="Signup Illustration"
                className="w-fit"
              />
            </figure>
            <div className="card-body">
              <div className="flex justify-center items-center h-full p-2 bg-deepSky-100 rounded-3xl">
                <div className="w-full max-w-md p-6 bg-mutedSteel-100 shadow-lg rounded-2xl">
                  <h2 className="text-2xl font-bold text-center mb-6 text-deepSky-100">
                    Create an Account
                  </h2>

                  <div>
                    <input
                      type="text"
                      placeholder="First Name"
                      className="input input-bordered w-full mb-4"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="input input-bordered w-full mb-4"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      className="input input-bordered w-full mb-4"
                      value={emailId}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      className="input input-bordered w-full mb-6"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />

                    <div className="w-full flex justify-center items-center">
                      <button
                        className={`btn btn-wide ${
                          loading
                            ? "opacity-50 cursor-not-allowed"
                            : "bg-deepSky-100 text-white"
                        }`}
                        onClick={handleSignup}
                        disabled={loading}
                      >
                        {loading ? "Signing up..." : "Sign Up"}
                      </button>
                    </div>

                    {/* Login Link for Existing Users */}
                    <p className="text-center mt-4 text-sm text-gray-600">
                      Already have an account?{" "}
                      <span
                        className="text-deepSky-100 cursor-pointer font-semibold"
                        onClick={() => navigate("/login")}
                      >
                        Login
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default Signup;
