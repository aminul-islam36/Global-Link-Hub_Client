import React from "react";

import BgImage from "../assets/Hero.jpg";

const Hero = () => {
  return (
    <div
      style={{ backgroundImage: `url(${BgImage})` }}
      className="hero min-h-[600px] bg-no-repeat bg-cover bg-top relative"
    >
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="hero-content text-center text-neutral-content relative z-10 w-[700px]">
        <div>
          <h2 className="text-lg italic text-accent mb-2">Trusted By People</h2>
          <h1 className="mb-5 text-4xl md:text-6xl font-bold leading-tight">
            We Offer Fast & Secure{" "}
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
          <button className="btn btn-accent text-white px-8">
            Get A Free Quote
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
