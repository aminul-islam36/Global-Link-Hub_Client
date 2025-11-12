import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-10">
      <div className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Company Info */}
        <div>
          <Link
            to="/"
            className="text-2xl font-bold border-b-2 border-b-accent"
          >
            Global <span className="text-accent">Hub</span>
          </Link>
          <p className="text-gray-400 mt-5">
            We provide quality export and import solutions worldwide. <br />{" "}
            Connecting businesses globally with trust and efficiency.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            <li>
              <a href="/" className="hover:text-accent">
                Home
              </a>
            </li>
            <li>
              <a href="/products" className="hover:text-accent">
                Products
              </a>
            </li>
            <li>
              <a href="/myexport" className="hover:text-accent">
                My Exports
              </a>
            </li>
            <li>
              <a href="/myImport" className="hover:text-accent">
                My Imports
              </a>
            </li>
          </ul>
        </div>

        {/* Social Info */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-gray-800 hover:bg-blue-600 transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-gray-800 hover:bg-blue-400 transition"
            >
              <FaXTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-gray-800 hover:bg-pink-500 transition"
            >
              <FaInstagram />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-gray-800 hover:bg-blue-700 transition"
            >
              <FaLinkedinIn />
            </a>
          </div>
          <p className="text-gray-500 mt-4 text-sm">
            Email: info@globallinkhub.com <br />
            Phone: +880 123 456 789
          </p>
        </div>
      </div>

      {/* ---------------Copyright ----------------*/}
      <div className="text-center text-gray-500 text-sm py-6 border-t border-gray-800 mt-10">
        &copy; {new Date().getFullYear()} Global Link Hub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
