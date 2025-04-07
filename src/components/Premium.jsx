import React from "react";
import { BASEURL } from "../utils/constants";
import axios from "axios";

const Premium = () => {
  const [isPremium, setIsPremium] = React.useState(false);
  const [membershipType, setMembershipType] = React.useState("");
  const verifyPaymentUser = async () => {
    try {
      const response = await axios.get(BASEURL + "/premium/verify", {
        withCredentials: true,
      });
      if (response.data.isPremium) {
        setIsPremium(true);
        setMembershipType(response.data.membershipType);
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
    }
  };
  const handlePayment = async (type) => {
    try {
      const order = await axios.post(
        BASEURL + "/payment/create",
        {
          membershipType: type,
        },
        {
          withCredentials: true,
        }
      );

      const { keyId, orderId, currency, notes, amount } = order.data;

      const options = {
        key: keyId,
        amount,
        currency,
        name: "DevMeet",
        description: "connection to others developers",
        order_id: orderId, // This is the order_id created in the backend
        prefill: {
          name: notes.firstName + " " + notes.lastName,
          email: notes.emailId,
          contact: 9999999998,
        },
        theme: {
          color: "#F37254",
        },
        handler: verifyPaymentUser,
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
      console.log("0rder", order);
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4 py-12">
      {isPremium ? (
        <h1 className="text-2xl font-semibold text-indigo-600 bg-indigo-100 px-6 py-4 rounded-2xl border-l-4 border-indigo-500 shadow-md max-w-fit mx-auto text-center">
          You are already a {membershipType ? membershipType : "premium"} user
        </h1>
      ) : (
        <div className="max-w-4xl w-full">
          <h1 className="text-3xl font-bold text-center mb-10 ">
            Choose Your Membership
          </h1>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Silver Membership */}
            <div className="card transform transition-transform duration-300 hover:scale-105 shadow-xl border bg-gradient-to-br from-gray-400 via-gray-100 to-white border-gray-400">
              <div className="card-body items-center text-center">
                <h2 className="card-title text-2xl text-gray-800">
                  🥈 Silver Membership
                </h2>
                <p className="text-gray-700 mt-2">
                  Chat with others and send up to{" "}
                  <strong>100 connection requests per day</strong>.
                </p>
                <p className="mt-4 text-sm text-gray-600">
                  Duration: <strong>3 Months</strong>
                </p>
                <div className="card-actions mt-6">
                  <button
                    className="btn btn-outline btn-primary"
                    onClick={() => handlePayment("silver")}
                  >
                    Choose Silver
                  </button>
                </div>
              </div>
            </div>

            {/* Gold Membership */}
            <div className="relative">
              <div className="absolute -top-3 -right-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full shadow-md z-10">
                Recommended
              </div>
              <div className="card transform transition-transform duration-300 hover:scale-105 shadow-xl border bg-gradient-to-br from-yellow-300 via-yellow-200 to-yellow-100 border-yellow-400">
                <div className="card-body items-center text-center">
                  <h2 className="card-title text-2xl text-yellow-900">
                    🥇 Gold Membership
                  </h2>
                  <p className="text-yellow-800 mt-2">
                    Enjoy <strong>infinite connection requests</strong> daily
                    and premium chat access.
                  </p>
                  <p className="mt-4 text-sm text-yellow-700">
                    Duration: <strong>6 Months</strong>
                  </p>
                  <div className="card-actions mt-6">
                    <button
                      className="btn btn-warning text-white"
                      onClick={() => handlePayment("gold")}
                    >
                      Choose Gold
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Premium;
