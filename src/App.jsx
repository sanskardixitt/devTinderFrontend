import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import navbar from "./components/navbar";
import Body from "./components/body";
import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./components/login";
import Feed from "./components/feed";
import Profile from "./components/profile";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { appStore, persistor } from "./utils/appStore";
import Connections from "./components/connections";
import Requests from "./components/Requests";
import Signup from "./components/signup";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter basename="/">
            <Routes>
              <Route path="/" element={<Body />}>
                <Route path="/" element={<Feed />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/profile" element={<Profile />}></Route>
                <Route path="/connections" element={<Connections />}></Route>
                <Route path="/requests" element={<Requests />}></Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
