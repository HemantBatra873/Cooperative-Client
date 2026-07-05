import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ReactNode } from "react";
import { Box, Typography } from "@mui/material";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  delay?: number;
  gradient: string;
}

export const FeatureCard = ({
  icon,
  title,
  description,
  delay = 0,
  gradient,
}: FeatureCardProps) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <Box
      component={motion.div}
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, scale: 1.02 }}
      sx={{
        position: "relative",
        borderRadius: "20px",
        p: 3.5,
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.10)",
        backdropFilter: "blur(12px)",
        cursor: "default",
        overflow: "hidden",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
        flexGrow: 1,
        "&:hover": {
          borderColor: "rgba(96,165,250,0.3) !important",
          boxShadow: "0 8px 40px rgba(0,0,0,0.3)",
        }
      }}
    >
      {/* Corner gradient accent */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 120,
          height: 120,
          background: gradient,
          borderRadius: "50%",
          filter: "blur(40px)",
          opacity: 0.5,
          transform: "translate(-40%, -40%)",
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 48,
            height: 48,
            borderRadius: 3,
            background: "rgba(255,255,255,0.08)",
            fontSize: 22,
          }}
        >
          {icon}
        </Box>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: "rgba(255,255,255,0.95)",
            letterSpacing: "-0.01em",
            mt: 0.5,
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            lineHeight: 1.65,
            color: "rgba(255,255,255,0.5)",
          }}
        >
          {description}
        </Typography>
      </Box>
    </Box>
  );
};

export default FeatureCard;
