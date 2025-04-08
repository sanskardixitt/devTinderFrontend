import { useParams } from "react-router";
import React, { useState, useRef, useEffect } from "react";
import { LucideSatellite, Send } from "lucide-react";
import profileImage from "../assets/undraw_pic-profile_nr49.svg";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASEURL } from "../utils/constants";
import sendIcon from "../assets/send.png";

const Chat = () => {
  const { targetUserId } = useParams();
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const [targetUserData, setTargetUserData] = useState({});

  const fetchChatMessages = async () => {
    try {
      const toUser = await axios.get(BASEURL + "/user/info/" + targetUserId, {
        withCredentials: true,
      });
      console.log("toUser", toUser);

      if (toUser) {
        setTargetUserData(toUser.data.data);
      }
      const chat = await axios.get(BASEURL + "/chat/" + targetUserId, {
        withCredentials: true,
      });
      const chatMessages = chat?.data?.messages.map((msg) => {
        return {
          firstName: msg?.senderId?.firstName,
          lastName: msg?.senderId?.lastName,
          text: msg?.text,
        };
      });

      setMessages(chatMessages);
    } catch (error) {
      console.error("Error fetching chat messages:", error);
    }
  };

  useEffect(() => {
    fetchChatMessages();
  }, []);

  useEffect(() => {
    const socket = createSocketConnection();

    socket.on("receiveMessage", ({ firstName, text }) => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: firstName === user.firstName ? "me" : firstName,
          text,
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    });

    if (userId && targetUserId && userId !== targetUserId) {
      socket.emit("joinChat", { userId, targetUserId });
    }

    return () => socket.disconnect();
  }, [userId, targetUserId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const socket = createSocketConnection();

    socket.emit("sendMessage", {
      firstName: user.firstName,
      userId,
      targetUserId,
      text: input,
    });

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: "me",
        text: input,
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);

    setInput("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-lightFog-100 px-2">
      <div className="w-full max-w-xl h-[600px] flex flex-col border rounded-2xl shadow-md bg-darkSlate-100 overflow-hidden">
        {/* Header */}
        <div className="flex items-center px-4 py-3 border-b bg-oceanBlue-100 shadow-sm">
          <img
            src={targetUserData?.profileImage || profileImage}
            alt="User"
            className="w-10 h-10 rounded-full object-cover mr-3"
          />
          <h3 className="text-lg font-semibold text-lightFog-100">
            Chatting with:{" "}
            <span className="text-white">{`${targetUserData?.firstName} ${targetUserData?.lastName}`}</span>
          </h3>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 space-y-3 overflow-y-auto bg-lightFog-50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`max-w-[75%] px-4 py-2 rounded-xl text-sm relative ${
                msg.sender === "me"
                  ? "bg-deepSky-100 text-white self-end ml-auto"
                  : "bg-gray-200 text-darkSlate-100 self-start mr-auto"
              }`}
            >
              <p>{msg.text}</p>
              <span className="text-xs absolute right-2 bottom-[-1.2rem] text-gray-500">
                {msg.timestamp}
              </span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t px-4 py-3 bg-deepSky-100 flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 rounded-full text-sm border-none outline-none shadow-sm focus:ring-2 focus:ring-oceanBlue-100"
          />
          <button
            onClick={sendMessage}
            className="p-2 rounded-full bg-white text-deepSky-100 hover:bg-lightFog-100 transition"
          >
            <img src={sendIcon} alt="Send" className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
