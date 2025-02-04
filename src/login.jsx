import React, { useState } from "react";
import LoginImage from "./assets/undraw_social-friends_b0ay.svg";
import axios from "axios";

import { Toaster, toast } from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:7777/login", {
        emailId: email,
        password: password,
      });

      if (res) {
        toast.success("Login successful");
        console.log("done login");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="flex justify-center items-center pt-4 ">
        <div className="mx-4 p-1 my-2 mt-5 w-[70%] ">
          <div className="card lg:card-side bg-linear-to-bl from-deepSky-100 to-lightFog-100 shadow-xl">
            <figure className=" lg:w-[50%] md:w-44 sm:w-40">
              <img src={LoginImage} alt="Album" className="w-fit" />
            </figure>
            <div className="card-body">
              <div className="flex justify-center items-center h-full  p-2 bg-deepSky-100 rounded-3xl">
                <div className="w-full max-w-md p-6 bg-mutedSteel-100 shadow-lg rounded-2xl">
                  <h2 className="text-2xl font-bold text-center mb-6 text-deepSky-100">
                    lets Login !!
                  </h2>

                  <div>
                    <div className="mb-4 w-full h-full flex justify-center items-center">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium mb-1"
                      ></label>
                      <label className="input input-bordered flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 16 16"
                          fill="currentColor"
                          className="h-4 w-4 opacity-70"
                        >
                          <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                          <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                        </svg>
                        <input
                          type="text"
                          className="grow bg-deepSky-100"
                          placeholder="Email"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </label>
                    </div>

                    <div className="mb-6 w-full h-full flex justify-center items-center">
                      <label className="input input-bordered flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 16 16"
                          fill="currentColor"
                          className="h-4 w-4 opacity-70"
                        >
                          <path
                            fillRule="evenodd"
                            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <input
                          type="password"
                          className="grow bg-deepSky-100"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </label>
                    </div>
                    <div className="w-full h-full flex justify-center items-center ">
                      <button
                        className="btn btn-wide bg-deepSky-100  text-white"
                        onClick={handleLogin}
                      >
                        login
                      </button>
                    </div>
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

export default Login;
