import { useEffect, useState } from "react";
import api from "../services/apiClient";

export default function MyBookings() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBookings() {
      try {
        const res = await api.get("/bookings");
        setBookings(res.data.bookings || []);
      } catch (error) {
        console.error("Failed to load bookings", error);
      } finally {
        setLoading(false);
      }
    }
    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-teal-50 to-blue-50 text-slate-600 text-base font-medium">
        Loading your bookings...
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-teal-50 to-blue-100 text-slate-600">
        <h2 className="text-2xl font-semibold mb-3 text-slate-800">
          No Bookings Found
        </h2>
        <button
          onClick={() => (window.location.href = "/")}
          className="bg-gradient-to-r from-teal-600 to-cyan-700 text-white font-medium px-4 py-2 rounded-lg shadow-md hover:shadow-lg hover:scale-[1.03] transition-all duration-300 text-sm"
        >
          Explore Experiences
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50 py-8 px-4">
      {/* Header */}
      <div className="max-w-5xl mx-auto mb-6 text-center">
        <h1 className="text-2xl font-bold text-slate-800 mb-1 tracking-tight">
          My Bookings
        </h1>
        <p className="text-slate-500 text-sm">
          Your confirmed and upcoming experiences, all in one place.
        </p>
      </div>

      {/* Booking Cards */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-4">
        {bookings.map((b) => (
          <div
            key={b.id}
            className="relative bg-white/80 backdrop-blur-md border border-slate-200 rounded-xl shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 overflow-hidden"
          >
            {/* Accent Border */}
            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-teal-500 via-blue-500 to-cyan-400" />

            <div className="p-4 flex flex-col h-full justify-between">
              {/* Basic Info */}
              <div className="mb-3">
                <h2 className="text-base font-semibold text-slate-800 mb-0.5">
                  {b.experience?.title || "Untitled Experience"}
                </h2>
                <p className="text-xs text-slate-500">
                  Ref ID: {b.id.slice(0, 8).toUpperCase()}
                </p>
              </div>

              {/* Main Details */}
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-700 mb-3">
                <p>
                  <span className="font-semibold">Date:</span>{" "}
                  {b.selectedDate || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Time:</span>{" "}
                  {b.selectedTime || "N/A"}
                </p>
                <p className="col-span-2">
                  <span className="font-semibold">Amount:</span> ₹
                  {b.totalAmount || "0.00"}
                </p>
                <p className="col-span-2">
                  <span className="font-semibold">Status:</span>{" "}
                  <span
                    className={`${
                      b.status === "confirmed"
                        ? "text-teal-600 font-semibold"
                        : "text-amber-600 font-medium"
                    }`}
                  >
                    {b.status || "Pending"}
                  </span>
                </p>
              </div>

              {/* Toggle Button */}
              <button
                onClick={() =>
                  setExpandedId(expandedId === b.id ? null : b.id)
                }
                className={`w-full text-xs font-semibold px-4 py-1.5 rounded-md border transition-all duration-300 ${
                  expandedId === b.id
                    ? "bg-slate-100 text-slate-800"
                    : "bg-gradient-to-r from-teal-600 to-cyan-700 text-white hover:shadow-lg hover:scale-[1.02]"
                }`}
              >
                {expandedId === b.id ? "Hide Details" : "View Details"}
              </button>

              {/* Expanded Details */}
              {expandedId === b.id && (
                <div className="mt-3 border-t border-slate-200 pt-2 text-xs text-slate-700 animate-fadeIn">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <p>
                      <span className="font-semibold">Name:</span>{" "}
                      {b.userName || "Guest"}
                    </p>
                    <p>
                      <span className="font-semibold">Email:</span>{" "}
                      {b.userEmail || "N/A"}
                    </p>
                    <p className="sm:col-span-2">
                      <span className="font-semibold">Notes:</span>{" "}
                      {b.notes || "No additional notes"}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
