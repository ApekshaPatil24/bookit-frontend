import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/*  Lottie Animation */}
      <DotLottieReact
        src="https://lottie.host/4299a5a7-d1f1-4be2-8588-49ee2746e2e7/832qLS59BE.lottie"
        autoplay
        loop
        className="w-[320px] h-[320px] sm:w-[400px] sm:h-[400px]"
      />

      {/* 404 Text */}
      <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold text-gray-800">
        404 - Page Not Found
      </h1>
      <p className="mt-3 text-gray-600 text-lg max-w-md text-center">
        Oops! The page you’re looking for doesn’t exist or has been moved.
      </p>

      {/* Button */}
      <button
        onClick={() => navigate("/")}
        className="mt-6 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl shadow-lg transition-all duration-300"
      >
        Go Back Home
      </button>
    </div>
  );
}

export default NotFound;
