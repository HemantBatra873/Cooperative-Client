import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useMediaQuery, useTheme } from "@mui/material";

const phrases = [
  "Smart Conversations.",
  "Fast Answers.",
  "Your 24/7 AI Partner.",
  "Made for Deep Thinkers.",
];

const AnimatedHeadline = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div
      style={{
        position: "relative",
        minHeight: isMobile ? "2.5em" : "1.2em",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: 50, opacity: 0, filter: "blur(8px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: -50, opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{
            display: "inline-block",
            background: "linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #34d399 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {phrases[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

export default AnimatedHeadline;
