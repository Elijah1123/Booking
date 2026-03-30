import React from "react";
import { FaInstagram, FaTwitter, FaTiktok } from "react-icons/fa";

const Footer = () => (
  <footer className="bg-gray-900 text-white pt-20 pb-10 px-8">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 border-b border-gray-800 pb-16">

      {/* Brand Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold">MZALENDO LUXE</h2>
        <p className="text-gray-400 text-sm leading-loose">
          The premier choice for global travelers seeking comfort and modern amenities in every city.
        </p>
      </div>

      {/* Navigation */}
      <div className="space-y-4">
        <h3 className="font-bold text-blue-500">Navigation</h3>
        <ul className="text-gray-400 space-y-2 text-sm">
          <li className="hover:text-white cursor-pointer transition">Home</li>
          <li className="hover:text-white cursor-pointer transition">Privacy Policy</li>
          <li className="hover:text-white cursor-pointer transition">Terms of Service</li>
        </ul>
      </div>

      {/* Social Links */}
      <div className="space-y-6">
        <h3 className="font-bold text-blue-500">Follow Our Journey</h3>

        <div className="flex space-x-6 items-center">

          {/* Instagram */}
          <a href="#" className="hover:text-pink-500 transition transform hover:scale-110">
            <FaInstagram size={24} />
          </a>

          {/* Twitter */}
          <a href="#" className="hover:text-blue-400 transition transform hover:scale-110">
            <FaTwitter size={24} />
          </a>

          {/* TikTok */}
          <a href="#" className="hover:text-red-400 transition flex items-center space-x-2 transform hover:scale-110">
            <FaTiktok size={24} />
            <span className="text-xs font-bold uppercase">TikTok</span>
          </a>

        </div>
      </div>

    </div>

    <p className="text-center mt-10 text-gray-600 text-xs uppercase tracking-widest">
      © 2026 Mzalendo Luxe Hotel Group
    </p>
  </footer>
);

export default Footer;