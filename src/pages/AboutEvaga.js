import React from "react";
import { motion } from "framer-motion";
function AboutEvaga() {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.3,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };
  return (
    <motion.div
      className="lg:max-w-[70%] mx-auto p-6 min-h-screen"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h1
        className="text-primary lg:text-3xl text-2xl font-semibold"
        variants={childVariants}
      >
        About Evaga
      </motion.h1>

      <motion.p
        className="mt-6 text-textGray text-justify"
        variants={childVariants}
      >
        In a world where celebrations define our most cherished moments, event
        planning remains <b>complex, fragmented, and overwhelming</b>. Evaga was
        born out of a bold vision—to <b>revolutionize the event industry</b> by
        creating India's first comprehensive, tech-driven event marketplace.
        <br />
        <br />
        We bring <b>seamless access to top-tier vendors</b>, from{" "}
        <b>
          stunning venues and world-class caterers to celebrated photographers,
          entertainers, and décor artists
        </b>
        . With a <b>digital-first, AI-powered approach</b>, Evaga{" "}
        <b>
          removes middlemen, ensures price transparency, and simplifies the
          event planning journey
        </b>
        —all in just a few clicks.
        <br />
        <br />
        For vendors, we provide a{" "}
        <b>powerful platform to scale their business</b>, increase visibility,
        and secure bookings without unnecessary commissions.
        <br />
        <br />
        Whether it's an{" "}
        <b>
          intimate wedding, a grand corporate gala, or an electrifying music
          festival or any personal events like birthdays, baby showers, etc.
          Evaga empowers people to dream big and execute flawlessly
        </b>
        . We’re not just building a marketplace; we’re{" "}
        <b>shaping the future of events</b> in India.
        <br />
        <br />
        <b>Welcome to Evaga—where every event is extraordinary.</b>
      </motion.p>
    </motion.div>
  );
}

export default AboutEvaga;
