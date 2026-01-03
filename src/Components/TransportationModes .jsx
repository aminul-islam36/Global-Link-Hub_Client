import { Plane, Ship, Train, Truck } from "lucide-react";
import React from "react";
import Title from "../utilities/Title";

const TransportationModes = () => {
  const modes = [
    {
      id: 1,
      icon: <Truck className="w-16 h-16" />,
      title: "Road Transport",
      description:
        "Our road transport service ensures fast and flexible delivery across local and regional routes, using a well-maintained fleet and expert drivers",
    },
    {
      id: 2,
      icon: <Train className="w-16 h-16" />,
      title: "Railway Logistics",
      description:
        "We provide cost-effective railway logistics for bulk shipments, ensuring safe, on-time delivery through trusted national and cross-border rail networks.",
    },
    {
      id: 3,
      icon: <Ship className="w-16 h-16" />,
      title: "Sea Freight",
      description:
        "Our sea freight solutions handle large-scale cargo efficiently, offering full-container and less-than-container load options with global port coverage.",
    },
    {
      id: 4,
      icon: <Plane className="w-16 h-16" />,
      title: "Air Freight",
      description:
        "We offer reliable air freight services for time-sensitive goods, ensuring express delivery through strong partnerships with major airlines worldwide.",
    },
  ];

  return (
    <div className="py-4 lg:py-8 max-w-7xl mx-auto flex justify-center items-center flex-col space-y-5">
      <Title>Our Modes Of Transportation</Title>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center items-center gap-2 lg:gap-4">
        {modes.map((mode) => (
          <div
            key={mode.id}
            className="flex flex-col items-center text-center p-4 border border-gray-200/30 rounded-2xl hover:shadow-sm"
          >
            <span className="text-accent">{mode.icon}</span>
            <h3 className="mt-4 text-xl font-semibold text-accent">
              {mode.title}
            </h3>
            <p className="mt-2 text-base-content text-sm leading-relaxed">
              {mode.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransportationModes;
