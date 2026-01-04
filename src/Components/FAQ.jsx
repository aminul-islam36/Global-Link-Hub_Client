import React from "react";
import { FaQuestionCircle } from "react-icons/fa";

const faqs = [
  {
    question: "What is Global Link Hub?",
    answer:
      "Global Link Hub is a centralized platform where you can manage, organize, and share all your important links from one place.",
  },
  {
    question: "Is Global Link Hub free to use?",
    answer:
      "Yes! We offer a free plan with essential features. Premium plans are available for advanced customization and analytics.",
  },
  {
    question: "Can I customize my link page?",
    answer:
      "Absolutely. You can customize colors, layout, branding, and more to match your personal or business identity.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes. We use industry-standard security practices to protect your data and ensure privacy at all times.",
  },
  {
    question: "Can I use Global Link Hub for my business?",
    answer:
      "Yes! Global Link Hub is perfect for creators, influencers, freelancers, and businesses to share all links professionally.",
  },
];

const FAQ = () => {
  return (
    <section className="bg-base-100 py-16">
      <div className="max-w-4xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <FaQuestionCircle className="text-4xl text-accent" />
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-base-content">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-base-content/70 max-w-xl mx-auto">
            Everything you need to know about Global Link Hub
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="collapse collapse-plus bg-base-200 border border-base-300 rounded-2xl"
            >
              <input type="radio" name="faq-accordion" />
              <div className="collapse-title text-lg font-semibold">
                {faq.question}
              </div>
              <div className="collapse-content text-base-content/80">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
