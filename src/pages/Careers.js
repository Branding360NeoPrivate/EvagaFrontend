import React from 'react'
import { motion } from 'framer-motion';
function Careers() {
  return (
    <div
    className="flex items-center justify-center min-h-screen"
    style={{
      background: 'linear-gradient(to right, #6A1B9A, #4A0072)',
    }}
  >
    <motion.div
      className="text-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 3,
        ease: 'easeInOut',
      }}
    >
      {/* Title Animation */}
      <motion.h1
        className="text-5xl md:text-8xl font-extrabold tracking-wide mb-6"
        style={{ color: '#F9D703', textShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)' }}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 2.5,
          ease: 'easeOut',
        }}
      >
        Coming Soon
      </motion.h1>

      {/* Subtext Animation */}
      <motion.p
        className="text-lg md:text-2xl mt-2"
        style={{ color: '#F9D703', opacity: 0.85 }}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          delay: 1.5,
          duration: 2.5,
          ease: 'easeInOut',
        }}
      >
        Stay tuned! Something extraordinary is on its way.
      </motion.p>

      {/* Animated Wave Dots */}
      <motion.div
        className="mt-10 flex justify-center space-x-4"
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.5 } },
        }}
      >
        {Array(5)
          .fill("")
          .map((_, i) => (
            <motion.div
              key={i}
              className="w-6 h-6 rounded-full"
              style={{
                backgroundColor: '#F9D703',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
              }}
              variants={{
                hidden: { y: 0 },
                visible: {
                  y: [0, -20, 0],
                },
              }}
              transition={{
                duration: 2,
                delay: i * 0.3, // Creates the wave effect
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            ></motion.div>
          ))}
      </motion.div>
    </motion.div>
  </div>
  )
}

export default Careers