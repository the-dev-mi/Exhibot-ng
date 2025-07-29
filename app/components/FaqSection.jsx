"use client";
import React, { useState } from "react";

const faqs = [
  {
    question: "What is Exhibot?",
    answer: "Exhibot is a robotics platform revolutionizing tech accessibility in Nigeria and beyond.",
  },
  {
    question: "Is Exhibot available globally?",
    answer: "Currently focused on Nigeria, global expansion is in the roadmap.",
  },
  {
    question: "Who can use Exhibot?",
    answer: "Anyone from tech enthusiasts, schools, developers, to hardware startups.",
  },
  {
    question: "How do I get involved?",
    answer: "Follow us on socials or reach out directly to explore collaboration opportunities.",
  },
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="h-auto">
        <div className="bg-white text-black py-20">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-center text-[3rem] md:text-[4rem] font-face text-blue-700 tracking-wide mb-12" style={{ fontFamily: 'Exima Geometric' }}>
          FAQ
        </h2>
        <div className="space-y-6 px-20 ">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm border text-[#F97216] rounded-2xl p-6 transition-all duration-300 hover:shadow-[0_0_20px] cursor-pointer"
              onClick={() => toggle(index)}
            >
              <div className="flex justify-between items-center text-xl font-semibold">
                <span>{faq.question}</span>
                <span className="text-blue-700 text-3xl">
                  {openIndex === index ? "−" : "+"}
                </span>
              </div>
              <div
                className={`mt-4 text-xl text-black transition-all duration-500 ease-in-out ${
                  openIndex === index ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0 overflow-hidden"
                }`}
              >
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </section>
  );
};

export default FaqSection;
