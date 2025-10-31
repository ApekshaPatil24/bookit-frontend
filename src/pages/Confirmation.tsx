import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import api from "../services/apiClient";

export default function Confirmation() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBooking() {
      try {
        const res = await api.get(`https://bookit-backend-ouc2.onrender.com/api/bookings/${id}`);
        setBooking(res.data.booking);
      } catch {
        setBooking(null);
      } finally {
        setLoading(false);
      }
    }
    fetchBooking();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-500 text-lg font-medium">
        Loading your confirmation...
      </div>
    );
  }

  if (!booking) {
    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-b from-red-50 to-white text-red-600 text-lg font-semibold">
          Booking not found ❌
        </div>
      );
    }

    return (
    <div className="h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex items-start justify-center pt-10">
      {/* Confirmation Card */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 sm:p-7 max-w-sm w-full text-center transition-all duration-300 hover:scale-[1.01]">

        {/*  Lottie Animation */}
        <div className="flex justify-center mb-3">
          <DotLottieReact
            src="https://lottie.host/b3ad5140-a3ac-4b15-9e5e-1f47a79ce521/xaPHhj47TK.lottie"
            loop={false}
            autoplay
            style={{ width: 120, height: 120 }}
          />
        </div>

        <h1 className="text-2xl font-bold text-green-700 mb-1 tracking-tight">
          Booking Confirmed!
        </h1>
        <p className="text-gray-600 text-xs md:text-sm leading-relaxed mb-4">
          Your booking has been successfully confirmed. We’re excited to have you onboard!
        </p>

        {/* Booking Info */}
        <div className="bg-green-50 rounded-lg p-4 mb-5 text-gray-700 text-xs md:text-sm grid grid-cols-2 gap-y-2">
          {/* Left Column - Labels */}
          <div className="text-left space-y-1 font-semibold text-gray-800">
            <p>Ref ID:</p>
            <p>Experience:</p>
            <p>Date:</p>
            <p>Time:</p>
          </div>

          {/* Right Column - Dynamic Data */}
          <div className="text-right space-y-1">
            <p className="font-mono text-green-700">
              {booking?.id ? booking.id.slice(0, 8).toUpperCase() : "N/A"}
            </p>
            <p>{booking?.experience?.title || booking?.experienceTitle || "Not Available"}</p>
            <p>{booking?.selectedDate || booking?.date || "N/A"}</p>
            <p>{booking?.selectedTime || booking?.time || "N/A"}</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-2">
          <button
            onClick={() => navigate("/")}
            className="w-full cursor-pointer bg-gradient-to-r from-green-300 to-green-500 hover:from-green-400 hover:to-green-400 text-white font-semibold py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-xs md:text-sm"
          >
            Back to Home
          </button>

          <button
            onClick={() => navigate("/bookings")}
            className="w-full  cursor-pointer bg-gray-100 text-gray-700 hover:bg-gray-200 font-medium py-2 rounded-lg transition-all duration-300 text-xs md:text-sm"
          >
            View My Bookings
          </button>
        </div>
      </div>
    </div>
  );
}
