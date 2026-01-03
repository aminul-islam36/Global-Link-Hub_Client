import React from "react";

import BgImage from "../assets/Hero.jpg";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div
      className="hero min-h-[600px] bg-no-repeat bg-top relative"
      style={{ backgroundImage: `url(${BgImage})` }}
    >
      <div className="absolute inset-0 bg-black/80"></div>
      <div className="hero-content w-full text-center text-neutral-content relative z-10 lg:w-[700px]">
        <div>
          <h3 className="text-lg text-accent mb-2">Trusted By People</h3>
          <h1 className="mb-5 text-3xl md:text-5xl font-bold leading-tight">
            We Offer Fast & Secure
            <span className="text-accent">Transportation</span>
          </h1>
          <p className="mb-6 text-gray-200">
            At Global Link Hub, we provide fast, reliable, and secure
            transportation services designed to meet the needs of modern
            businesses and individuals. Our priority is ensuring that every
            shipment reaches its destination on time and in perfect condition.
            We understand that time and safety are crucial in logistics. why our
            operations are supported by advanced tracking systems, skilled
            drivers, and a well-maintained fleet to guarantee smooth and
            efficient delivery. From local distribution to international
            freight, we handle each shipment with care and precision.
          </p>
          <a href="#contact" className="btn btn-accent text-white px-8">
            Get A Free Quote
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
