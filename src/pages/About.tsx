import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100 text-gray-800 flex flex-col justify-center items-center overflow-hidden">
        {/* Hero Section */}
        <motion.section
            className="text-center px-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">
                We Believe in{" "}
                <motion.span
                    className="text-yellow-500"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{
                    duration: 0.9,
                    ease: "easeInOut",
                    }}
                >
                    Experiences
                </motion.span>
            </h1>
            <p className="max-w-xl mx-auto text-sm md:text-base text-gray-600">
                BookIt connects travelers with unforgettable experiences — crafted by locals,
                curated with care, and powered by technology.
            </p>
        </motion.section>

        {/* Mission & Vision */}
        <motion.section
            className="mt-8 grid md:grid-cols-2 gap-6 max-w-4xl px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.9 }}
        >
            <motion.div
                whileHover={{ scale: 1.03 }}
                className="bg-white rounded-xl shadow-md p-4 border border-yellow-100 transition-transform"
            >
                <h2 className="text-lg font-bold text-yellow-500 mb-1">Our Mission</h2>
                <p className="text-sm text-gray-700 leading-relaxed">
                    To make exploring the world simple, authentic, and meaningful — one
                    experience at a time.
                </p>
            </motion.div>
            <motion.div
                whileHover={{ scale: 1.03 }}
                className="bg-white rounded-xl shadow-md p-4 border border-yellow-100 transition-transform"
            >
                <h2 className="text-lg font-bold text-yellow-500 mb-1">Our Vision</h2>
                <p className="text-sm text-gray-700 leading-relaxed">
                    To become the most trusted platform for discovering, booking, and sharing
                    life-changing adventures.
                </p>
            </motion.div>
        </motion.section>

        {/* Values */}
        <motion.section
            className="mt-8 bg-gray-900 text-white rounded-2xl py-6 px-4 w-[90%] md:w-[75%] shadow-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.9 }}
        >
            <h2 className="text-2xl font-bold text-center mb-5 tracking-tight">
                Our Core Values
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
                { title: "Innovation", desc: "Tech that makes travel seamless." },
                { title: "Trust", desc: "Verified hosts. Secure bookings." },
                { title: "Sustainability", desc: "Travel that respects our planet." },
                { title: "Simplicity", desc: "Your next journey — made easy." },
            ].map((value, index) => (
                <motion.div
                    key={index}
                    whileHover={{
                    scale: 1.08,
                    rotate: 1,
                }}
                className="bg-gray-800 rounded-lg py-3 px-2 shadow-md hover:shadow-lg transition"
                >
                    <h3 className="text-yellow-400 text-base font-semibold mb-1">
                        {value.title}
                    </h3>
                    <p className="text-xs text-gray-300">{value.desc}</p>
                </motion.div>
            ))}
            </div>
        </motion.section>

        {/* CTA */}
        <motion.section
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
        >
            <h2 className="text-lg font-semibold mb-2">Start Your Journey Today</h2>
            <Link to="/">
                <motion.button
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="bg-yellow-500 cursor-pointer hover:bg-yellow-600 text-white px-6 py-2 rounded-full text-sm font-medium shadow-md transition"
                >
                    Explore Experiences
                </motion.button>
            </Link>
        </motion.section>
    </div>
  );
}
