// src/routes/AppRoutes.tsx
import { Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import Home from "../pages/Home";
import ExperienceDetails from "../pages/Experiencedetails";
import Booking from "../pages/BookingPage";
import Confirmation from "../pages/Confirmation";
import NotFound from "../pages/NotFound";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MyBookings from "../pages/MyBookings";
import About from "../pages/About";

export default function AppRoutes() {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex flex-col min-h-screen">
      {/* Pass onSearch only when on Home route */}
      <Navbar onSearch={location.pathname === "/" ? setSearchQuery : undefined} />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home searchQuery={searchQuery} />} />
          <Route path="/experience/:id" element={<ExperienceDetails />} />
          <Route path="/booking/:id" element={<Booking />} />
          <Route path="/confirmation/:id" element={<Confirmation />} />
          <Route path="/bookings" element={<MyBookings />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
