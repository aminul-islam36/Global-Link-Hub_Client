import React from "react";
import { Quote, Star } from "lucide-react";
import Title from "../utilities/Title";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "CEO, TechFlow Inc.",
      text: "Global Hub has transformed our logistics. Their real-time tracking and secure handling are unmatched in the industry.",
      rating: 5,
      img: "https://i.pravatar.cc/150?u=1",
    },
    {
      id: 2,
      name: "David Smith",
      role: "Operations Manager",
      text: "The most reliable freight partner we've worked with. Their sea freight solutions saved us 20% on shipping costs this year.",
      rating: 5,
      img: "https://i.pravatar.cc/150?u=2",
    },
    {
      id: 3,
      name: "Maria Rodriguez",
      role: "E-commerce Founder",
      text: "Customer support is top-notch. They helped us navigate complex customs issues without any delays in our delivery.",
      rating: 5,
      img: "https://i.pravatar.cc/150?u=3",
    },
    {
      id: 4,
      name: "Maria Rodriguez",
      role: "E-commerce Founder",
      text: "Customer support is top-notch. They helped us navigate complex customs issues without any delays in our delivery.",
      rating: 5,
      img: "https://i.pravatar.cc/150?u=3",
    },
  ];

  const partners = [
    {
      name: "DHL",
      logo: "https://i.ibb.co.com/rGGwbzNR/download-4.png",
    },
    {
      name: "FedEx",
      logo: "https://i.ibb.co.com/1Y7GXPt6/download-2.png",
    },
    {
      name: "Maersk",
      logo: "https://i.ibb.co.com/p60DWdP6/download-3.png",
    },
    {
      name: "UPS",
      logo: "https://i.ibb.co.com/FQg2Xyg/download-18.jpg",
    },
    {
      name: "DARAZ",
      logo: "https://i.ibb.co.com/VYMbD8gm/download-2.png",
    },
    {
      name: "ALI BABA",
      logo: "https://i.ibb.co.com/S2PFM9P/download-18.jpg",
    },
  ];

  return (
    <section className="py-4 lg:py-8 max-w-7xl mx-auto flex justify-center items-center flex-col space-y-5">
      <h2 className="text-accent font-bold tracking-widest uppercase text-sm">
        Testimonials
      </h2>
      <Title> Hear From Our Clients</Title>
      <p className="text-base-content max-w-2xl mx-auto mb-12">
        Trusted by businesses worldwide for our commitment to speed and
        security.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center items-center gap-2 lg:gap-4">
        {testimonials.map((item) => (
          <div
            key={item.id}
            className="card w-full bg-base-200 border border-gray-200/30 relative pt-10 px-6 pb-8"
          >
            <div className="absolute -top-5 left-8 bg-accent p-3 rounded-lg text-white shadow-lg">
              <Quote size={24} />
            </div>

            <p className="italic text-base-content mb-6 leading-relaxed">
              "{item.text}"
            </p>
            <div className="flex items-center gap-4 border-t pt-4">
              <div className="avatar">
                <div className="w-12 rounded-full">
                  <img src={item.img} alt={item.name} />
                </div>
              </div>
              <div>
                <h4 className="font-bold text-lg">{item.name}</h4>
                <p className="text-sm text-accent font-medium">{item.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- Partners Section --- */}
      <div className="pt-5 border-t border-base-300">
        <p className="text-center text-accent font-bold uppercase text-xs mb-6">
          Our Trusted Logistics Partners
        </p>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 lg:gap-4 items-center justify-items-center">
          {partners.map((partner) => (
            <div data-tip={partner.name} key={partner.name} className="tooltip">
              <img
                src={partner.logo}
                alt={partner.name}
                className="w-full max-w-[200px] aspect-3/1 cursor-pointer hover:scale-110 opacity-60 grayscale hover:grayscale-0 border border-gray-200 rounded  transition-transform tooltip"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
