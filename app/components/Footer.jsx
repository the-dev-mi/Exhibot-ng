"use client";

import React from "react";
import 'remixicon/fonts/remixicon.css';
import { motion } from "framer-motion";

const socials = [
  { href: "https://discord.gg/uCYwT6keJK", icon: "ri-discord-fill", color: "#7289DA" },
  { href: "https://x.com/exhibotng", icon: "ri-twitter-x-line", color: "#2563EB" },
  { href: "https://www.youtube.com/channel/UCGpDVP0yJKvHraDksb8ANzg", icon: "ri-youtube-fill", color: "#FF0000" },
  { href: "https://instagram.com/exhibotng", icon: "ri-instagram-fill", color: "#C13584" },
  { href: "https://www.tiktok.com/@exhibot.ng", icon: "ri-tiktok-fill", color: "#000000" }
];

const container = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.15 } }
};
const child = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

const Footer = () => (
  <motion.footer
    className="relative bg-[#F97216] text-white px-4 pt-10 pb-8 sm:px-10 md:px-20 lg:px-32 mt-10"
    variants={container}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
  >
    {/* <motion.div variants={child} className="h-1 w-full bg-blue-700 mb-4 sm:mb-10" /> */}

    <motion.div
      variants={child}
      className="text-[2.5rem] sm:text-[4rem] md:text-[6rem] mt-8 md:mt-40 mb-8 md:mb-40 font-heading text-nowrap text-[#f2f5e7] leading-none text-center"
      style={{ userSelect: "none" }}>
      EXHIBOT NG
    </motion.div>

    <motion.div
      variants={child}
      className="flex flex-col-reverse md:flex-row items-center md:items-start justify-between w-full gap-8"
    >
      {/* Links */}
      <div className="flex flex-col items-center md:items-start gap-2 md:gap-6 text-base sm:text-lg md:text-xl text-white/60">
        <a className="text-blue-700 focus-visible:ring-2 rounded px-1">Send us a message</a>
        <a href="mailto:admin@byhavi.tech" className="hover:underline focus-visible:ring-2 rounded px-1">admin@byhavi.tech</a>
      </div>

      {/* Socials */}
      <div className="flex flex-col items-center gap-3">
        <span className="text-blue-700 font-body font-semibold mb-2 text-lg">Follow Us</span>
        <div className="flex flex-wrap justify-center gap-3 md:gap-5 text-3xl md:text-[2.2rem]">
          {socials.map(({ href, icon, color }, i) => (
            <motion.a
              href={href}
              key={i}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-[#F97216] focus-visible:ring-2 focus-visible:ring-white/70 rounded-full"
              whileHover={{
                scale: 1.15,
                boxShadow: `0 0 16px 2px ${color}55`,
                color
              }}
              whileTap={{
                scale: 0.93,
                boxShadow: `0 0 4px 1px ${color}88`,
                color
              }}
              transition={{ type: "spring", stiffness: 200, damping: 16 }}
              style={{ borderRadius: "50%" }}
            >
              <i className={icon} />
            </motion.a>
          ))}
        </div>
      </div>
    </motion.div>

    <motion.div
      variants={child}
      className="flex justify-center w-full font-light text-base sm:text-lg border-t-2 rounded-t-2xl pt-4 text-white/60 mt-8"
      animate={{
        scale: [1, 1.025, 1],
        textShadow: ["none", "0px 0px 8px #fff1", "none"]
      }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    >
      <span>© 2025 Exhibot NG | All Rights reserved.</span>
    </motion.div>
  </motion.footer>
);

export default Footer;