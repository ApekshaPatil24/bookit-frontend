function Footer() {
  return (
    <footer className="bg-gray-800 text-white text-center py-4">
      <p className="text-sm sm:text-base font-medium tracking-wide">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold text-yellow-400">BookIt</span>. All rights reserved.
      </p>
      <div className="mt-1 text-xs opacity-80 text-gray-300">
        Crafted with 💛 for better experiences.
      </div>
    </footer>
  );
}

export default Footer;
