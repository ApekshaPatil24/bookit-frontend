import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/apiClient";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";


export default function ExperienceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [exp, setExp] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    api
      .get(`/${id}`)
      .then((res) => {
        const e = res.data;
        const normalized = {
          id: e.id,
          title: e.title,
          shortDesc: e.description,
          location: e.location,
          basePrice: e.price,
          coverImage: e.imageUrl,
          tags: e.tags || [],
          slots:
            e.slots?.map((slot: any) => ({
              id: slot.id,
              dateTime: new Date(slot.date),
              available: slot.available,
            })) || [],
        };
        setExp(normalized);
      })
      .catch(() => setError("Failed to load experience details"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="p-10 text-gray-600 text-center">Loading...</div>;
  if (error) return <div className="p-10 text-red-500 text-center">{error}</div>;
  if (!exp) return null;

  const groupedSlots = exp.slots.reduce((acc: any, slot: any) => {
    const dateOnly = slot.dateTime.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    if (!acc[dateOnly]) acc[dateOnly] = [];
    acc[dateOnly].push(slot);
    return acc;
  }, {});
  const dates = Object.keys(groupedSlots);

  const allTimes = exp.slots.map((slot: any) => ({
    id: slot.id,
    date: slot.dateTime.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
    time: slot.dateTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }),
    available: slot.available,
  }));

  const subtotal = exp.basePrice * quantity;
  const taxes = Math.round(subtotal * 0.06);
  const total = subtotal + taxes;

  function handleConfirm() {
    if (!selectedDate || !selectedTime) {
      alert("Please select both date and time");
      return;
    }
    const selectedSlot = exp.slots.find((slot: any) => {
      const dateStr = slot.dateTime.toDateString();
      const timeStr = slot.dateTime
        .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true })
        .toLowerCase();
      return dateStr === new Date(selectedDate!).toDateString() && selectedTime.toLowerCase() === timeStr;
    });
    navigate(`/booking/${exp.id}`, {
      state: {
        experience: exp,
        selectedDate,
        selectedTime,
        quantity,
        total,
        slotId: selectedSlot?.id,
      },
    });
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100">
      <div className="absolute inset-0 bg-[url('/assets/bg-pattern.svg')] opacity-10"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-[1.6fr_0.8fr] gap-8">
        {/* LEFT SIDE */}
        <div className="backdrop-blur-sm bg-white/70 rounded-2xl shadow-lg p-5 hover:shadow-2xl transition-all duration-300">
          <img
            src={exp.coverImage || "/assets/placeholder.jpg"}
            alt={exp.title}
            className="w-full h-[240px] object-cover rounded-xl shadow-sm mb-5"
          />

          <h1 className="text-xl font-semibold text-gray-900 mb-1">{exp.title}</h1>
          <p className="text-gray-600 text-xs mb-4">{exp.shortDesc}</p>

          {/* Date Selection */}
          <h2 className="font-semibold text-gray-800 text-sm mb-2">Choose Date</h2>
          <div className="flex flex-wrap gap-2 mb-5">
            {dates.map((date) => (
              <button
                key={date}
                onClick={() => setSelectedDate((prev) => (prev === date ? null : date))}
                className={`px-3 cursor-pointer py-1 border rounded-lg text-xs font-medium transition-all duration-300 ${
                  selectedDate === date
                    ? "bg-yellow-500 text-white border-yellow-500 shadow-md scale-105"
                    : "border-gray-300 bg-white hover:border-yellow-500 hover:scale-105"
                }`}
              >
                {date}
              </button>
            ))}
          </div>

          {/* Time Selection */}
          <h2 className="font-semibold text-gray-800 text-sm mb-2">Choose Time</h2>
          <div className="flex flex-wrap gap-2 mb-5">
            {allTimes.map((slot: any) => (
              <button
                key={slot.id}
                onClick={() => slot.available && setSelectedTime((prev) => (prev === slot.time ? null : slot.time))}
                disabled={!slot.available}
                className={`px-3 py-1 cursor-pointer no-drop border rounded-lg text-xs font-medium transition-all duration-300 ${
                  selectedTime === slot.time
                    ? "bg-yellow-500 text-white border-yellow-500 shadow-md scale-105"
                    : "border-gray-300 bg-white hover:border-yellow-500 hover:scale-105"
                } ${!slot.available ? "opacity-40 cursor-not-allowed" : ""}`}
              >
                {slot.time}
                {!slot.available && <span className="ml-1 text-[9px] text-red-500">Sold out</span>}
              </button>
            ))}
          </div>

          <p className="text-[10px] text-gray-500 mb-5">All times are in IST (GMT +5:30)</p>

          {/* About */}
          <div className="border-t pt-3">
            <h3 className="text-base font-semibold mb-1 text-gray-800">About</h3>
            <p className="text-gray-600 text-xs leading-relaxed">
              Scenic routes, trained guides, and safety briefing. Minimum age 10. All safety gear included. Experience the adventure with top-tier safety and comfort.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE (Booking Summary) */}
        <div className="sticky top-20 h-fit backdrop-blur-md bg-white/70 border border-gray-200 rounded-2xl shadow-lg p-5 hover:shadow-2xl transition-all duration-300">
          <DotLottieReact
              src="https://lottie.host/c726a566-32a2-424a-a68e-de7822fdab1a/8mzNJSm7PN.lottie"
              loop
              autoplay
              className="w-28 h-28"
            />
          <h3 className="text-base font-semibold text-gray-800 mb-4 flex justify-between">
            Starts at <span className="text-yellow-600 font-bold text-lg">₹{exp.basePrice}</span>
          </h3>

          <div className="flex justify-between items-center mb-4">
            <span className="text-xs text-gray-700 font-medium">Quantity</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-6 h-6 flex cursor-pointer items-center justify-center rounded-full border border-gray-400 hover:bg-gray-100"
              >
                −
              </button>
              <span className="font-semibold  text-gray-800 text-sm">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-6 h-6 flex items-center cursor-pointer justify-center rounded-full border border-gray-400 hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          <div className="space-y-1.5 text-xs text-gray-700 mb-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Taxes (6%)</span>
              <span>₹{taxes}</span>
            </div>
            <div className="flex justify-between font-semibold border-t pt-2 text-gray-900 text-sm">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>

          <button
            onClick={handleConfirm}
            className="w-full cursor-pointer bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-semibold py-2.5 rounded-lg shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 text-sm"
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
}
