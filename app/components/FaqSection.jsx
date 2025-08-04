"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "What is eXhibot Ng?",
    answer: "eXhibot Ng, by Havitech Core Ltd, is a robotics platform igniting Nigeria’s tech scene with BattleBots-style battles, interactive exhibitions, and a talent hub for young innovators",
  },
  {
    question: "What problem does eXhibot Ng solve?",
    answer: "We tackle the lack of accessible robotics education and opportunities for Nigerian youth, empowering them to build and compete with tech.",
  },
  {
    question: "Who can participate in eXhibot Ng events?",
    answer: "Everyone! Students, hobbyists, and engineers of all levels can join exhibitions, workshops, or competitions.",
  },
  {
    question: "Is eXhibot Ng a startup",
    answer: "Yes, eXhibot Ng is a dynamic startup founded by Havitech Core Ltd, driven to revolutionize robotics with a fresh, community-focused approach",
  },
  {
    question: "Does eXhibot Ng only focus on events?",
    answer: "No, it’s more than events! We’re building a movement with education, talent development, and innovation hubs to sustain long-term impact.",
  },
  {
    question: "What is the future of eXhibot Ng",
    answer: "The future includes scaling nationwide with a robotics festival, expanding globally, and leading Africa’s tech innovation through cutting-edge projects",
  },
  {
    question: "What is the eXhibot Lab?",
    answer: "The eXhibot Lab is our upcoming innovation space, where creators will design, test, and build next-gen robots, fostering hands-on learning and breakthroughs",
  },
  {
    question: "Is eXhibot Ng the next Silicon Valley?",
    answer: "We aim to be Nigeria’s robotics hub, not a replacement for Silicon Valley, but a unique ecosystem inspiring global tech leadership from African soil!",
  },
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="bg-white text-black py-12 sm:py-20"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-8">
        <h2 className="text-center text-3xl sm:text-[3rem] md:text-[3rem] font-face text-blue-700 tracking-wide mb-8 sm:mb-12" style={{ fontFamily: 'Exima Geometric' }}>
          Unravel the Mysteries
        </h2>
        <div className="space-y-4 sm:space-y-6 px-4 sm:px-20">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm border text-[#F97216] rounded-2xl p-4 sm:p-6 transition-all duration-300 hover:shadow-[0_0_20px] cursor-pointer"
              onClick={() => toggle(index)}
            >
              <div className="flex justify-between items-center text-lg sm:text-xl font-semibold">
                <span>{faq.question}</span>
                <span className="text-blue-700 text-2xl sm:text-3xl">
                  {openIndex === index ? "−" : "+"}
                </span>
              </div>
              <motion.div
                initial={{ maxHeight: 0, opacity: 0 }}
                animate={{ maxHeight: openIndex === index ? 500 : 0, opacity: openIndex === index ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                className="mt-4 text-lg sm:text-xl text-black overflow-hidden"
              >
                {faq.answer}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default FaqSection;