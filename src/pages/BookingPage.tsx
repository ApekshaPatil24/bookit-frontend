import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../services/apiClient";
import Swal from "sweetalert2";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function BookingPage() {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const experience = state?.experience;
  const selectedDate = state?.selectedDate;
  const selectedTime = state?.selectedTime;
  const quantity = state?.quantity || 1;
  const slotId = state?.slotId;
  const subtotal = experience?.basePrice * quantity;
  const taxes = Math.round(subtotal * 0.06);
  const total = subtotal + taxes;

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [finalAmount, setFinalAmount] = useState(total);
  const [message, setMessage] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  async function applyPromo() {
    try {
      const res = await api.post("/bookings/promo/validate", {
        code: promoCode,
        amount: finalAmount,
      });
      if (res.data.valid) {
        setFinalAmount(res.data.finalAmount);
        setPromoApplied(true);
        setMessage("✅ Promo applied successfully!");
      } else {
        setMessage("❌ Invalid promo code");
      }
    } catch {
      setMessage("⚠️ Failed to validate promo");
    }
  }

  async function confirmBooking() {
    if (!userName || !userEmail) {
      setMessage("⚠️ Please fill all details before confirming.");
      return;
    }

    const result = await Swal.fire({
      title: "Confirm Booking?",
      text: `You’re about to pay ₹${finalAmount} for ${experience.title}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#facc15",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Confirm",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const res = await api.post("/bookings", {
          experienceId: experience.id,
          slotId,
          selectedDate,
          selectedTime,
          quantity,
          userName,
          userEmail,
          totalAmount: finalAmount,
          promoCode: promoApplied ? promoCode : null,
        });

        await Swal.fire({
          title: "🎉 Booking Successful!",
          text: "Your booking has been confirmed successfully.",
          icon: "success",
          confirmButtonColor: "#facc15",
        });

        navigate(`/confirmation/${res.data.booking.id}`);
      } catch (err: any) {
        Swal.fire({
          title: "❌ Booking Failed",
          text:
            err.response?.data?.error ||
            "Something went wrong. Please try again.",
          icon: "error",
        });
      }
    }
  }

  if (!experience)
    return <div className="p-10 text-red-600">Invalid request</div>;

  return (
    <div className="min-h-screen  bg-gradient-to-br from-yellow-50 via-white to-yellow-100 overflow-hidden flex justify-center items-center px-8 py-12">
      
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* LEFT SIDE — Intro + Checkout */}
        <div className="flex flex-col justify-start space-y-6">
          {/*  Intro Section */}
          <section className="text-left flex items-center space-x-4">
            <DotLottieReact
              src="https://lottie.host/76b87528-a148-41be-892b-d0a5f00a02a3/G5zPCPbOi7.lottie"
              loop
              autoplay
              className="w-28 h-28"
            />
            <div>
              <h1 className="text-4xl sm:text-2xl md:text-4xl font-extrabold tracking-tight text-gray-900 leading-tight">
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-amber-600">
                  Secure Your Booking ✨
                </span>
                
              </h1>
              <p className="text-gray-600 text-xs leading-relaxed max-w-sm">
                Fill in your details below and confirm your spot instantly.
                Double-check your date and time before proceeding — once booked, it’s yours!
              </p>
            </div>
          </section>

          {/*  Checkout Section */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-2xl transition-all duration-300">
            <h2 className="text-base font-semibold text-gray-800 mb-2">
              Checkout Details
            </h2>
            <p className="text-xs text-gray-500 mb-4 leading-relaxed">
              Please enter your details carefully. You’ll receive your confirmation on the given email.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <input
                type="text"
                placeholder="Full Name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-yellow-400 outline-none"
              />
              <input
                type="email"
                placeholder="Email Address"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-yellow-400 outline-none"
              />
            </div>

            <div className="flex gap-2 mb-3">
              <input
                type="text"
                placeholder="Promo Code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="border border-gray-200 rounded-lg px-3 py-2 flex-1 text-sm focus:ring-2 focus:ring-yellow-400 outline-none"
              />
              <button
                onClick={applyPromo}
                className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium px-4 py-2 rounded-lg text-sm transition-all"
              >
                Apply
              </button>
            </div>

            <div className="flex items-center text-xs text-gray-600 mb-3">
              <input type="checkbox" className="mr-2 accent-yellow-400" />
              <span>I agree to the Terms & Privacy Policy.</span>
            </div>

            {message && (
              <p className="text-xs text-yellow-700 mt-1 italic">{message}</p>
            )}
          </div>
        </div>

        {/* RIGHT SIDE — Experience Summary */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:sticky md:top-[-40px] transform scale-95 md:scale-100 
                          w-[92%] mx-auto transition-all duration-300 -mt-6 md:-mt-10">
            <h3 className="text-2xl pb-3 font-extrabold tracking-tight text-gray-900 leading-tight">
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-amber-600">
                Experience Summary
              </span>
            </h3>

            <img
              src={experience.coverImage || "/assets/placeholder.jpg"} alt={experience.title}
              className="w-full h-32 md:h-36 object-cover rounded-lg mb-4"
            />

            <div className="space-y-1 text-sm md:text-base text-gray-700">
              <div className="flex justify-between">
                <span>Experience</span>
                <span className="font-medium truncate">{experience.title}</span>
              </div>
              <div className="flex justify-between">
                <span>Date</span>
                <span>{selectedDate}</span>
              </div>
              <div className="flex justify-between">
                <span>Time</span>
                <span>{selectedTime}</span>
              </div>
              <div className="flex justify-between">
                <span>Qty</span>
                <span>{quantity}</span>
              </div>

              <hr className="my-2 border-gray-200" />

              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes (6%)</span>
                <span>₹{taxes}</span>
              </div>

              <hr className="my-2 border-gray-200" />

              <div className="flex justify-between font-semibold text-gray-900 text-base md:text-lg">
                <span>Total</span>
                <span>₹{finalAmount}</span>
              </div>
            </div>

            <button
              onClick={confirmBooking}
              className="w-full cursor-pointer bg-gradient-to-r from-orange-100 to-orange-300 text-gray-900 font-semibold py-2.5 rounded-lg shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 text-sm" >
                PAY & CONFIRM
            </button>
          </div>
        </div>
    </div>
  );
}
