import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Header from "../components/Header";
import AnimatedHeadline from "../components/home/AnimatedHeadline";
import FeatureCard from "../components/home/FeatureCard";
import { useInView } from "react-intersection-observer";
import video from "/video.mp4";
import { Box, Button, Container, Grid, Typography, useTheme, useMediaQuery } from "@mui/material";

// ---- Feature data ----
const features = [
  {
    icon: "⚡",
    title: "Lightning-Fast Responses",
    description:
      "Powered by Gemini 2.0 Flash — get accurate, thoughtful answers in milliseconds, every time.",
    delay: 0,
    gradient: "radial-gradient(circle, rgba(96,165,250,0.6) 0%, transparent 70%)",
  },
  {
    icon: "🧠",
    title: "Deep Contextual Understanding",
    description:
      "CooperativeAI remembers your conversation and builds on it intelligently, just like a real teammate.",
    delay: 0.1,
    gradient: "radial-gradient(circle, rgba(167,139,250,0.6) 0%, transparent 70%)",
  },
  {
    icon: "🔒",
    title: "Secure & Private",
    description:
      "Your conversations are encrypted and private. We never share your data with third parties.",
    delay: 0.2,
    gradient: "radial-gradient(circle, rgba(52,211,153,0.5) 0%, transparent 70%)",
  },
  {
    icon: "🌐",
    title: "Always Available",
    description:
      "24/7 uptime means CooperativeAI is ready whenever inspiration (or a deadline) strikes.",
    delay: 0.3,
    gradient: "radial-gradient(circle, rgba(251,191,36,0.4) 0%, transparent 70%)",
  },
];

// ---- Stagger container variants ----
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

// ---- Stats data ----
const stats = [
  { value: "2.0", label: "Gemini Flash", suffix: "" },
  { value: "99", label: "Uptime", suffix: ".9%" },
  { value: "<100", label: "Response time", suffix: "ms" },
  { value: "∞", label: "Context window", suffix: "" },
];

// ---- Stat item ----
const StatItem = ({ value, label, suffix, delay }: { value: string; label: string; suffix: string; delay: number }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });
  return (
    <Box
      component={motion.div}
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      sx={{ textAlign: "center", flex: "1 1 120px", minWidth: 100 }}
    >
      <Typography
        variant="h3"
        sx={{
          fontWeight: 800,
          background: "linear-gradient(135deg, #60a5fa, #a78bfa)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          letterSpacing: "-0.02em",
          lineHeight: 1,
        }}
      >
        {value}
        <Box component="span" sx={{ fontSize: "0.55em" }}>{suffix}</Box>
      </Typography>
      <Typography
        variant="caption"
        sx={{
          display: "block",
          marginTop: 1,
          color: "rgba(255,255,255,0.45)",
          letterSpacing: "0.05em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </Typography>
    </Box>
  );
};

// ---- Main Home Page ----
const Home = () => {
  const auth = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        overflow: "hidden",
      }}
    >
      {/* ---- Background video ---- */}
      <video
        src={video}
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "grayscale(100%) brightness(0.25) contrast(1.4)",
          zIndex: 0,
        }}
      />

      {/* Subtle noise overlay */}
      <Box
        sx={{
          position: "fixed",
          inset: 0,
          zIndex: 1,
          opacity: 0.03,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px",
          pointerEvents: "none",
        }}
      />

      {/* ---- Header ---- */}
      <Box sx={{ position: "relative", zIndex: 10 }}>
        <Header />
      </Box>

      {/* ================================================================
          HERO SECTION
      ================================================================ */}
      <Box
        component="section"
        sx={{
          position: "relative",
          zIndex: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "calc(100vh - 64px)",
          py: 4,
          px: 2,
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          {/* Badge */}


          {/* Main headline */}
          <Box
            component={motion.div}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Typography
              component={motion.h1}
              variants={itemVariants}
              variant="h2"
              sx={{
                fontSize: { xs: "2.4rem", sm: "3.2rem", md: "3.75rem" },
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                color: "rgba(255,255,255,0.96)",
                mb: 1,
              }}
            >
              Meet CooperativeAI
            </Typography>

            {/* Animated rotating phrase */}
            <Box
              component={motion.div}
              variants={itemVariants}
              sx={{
                typography: 'h2',
                fontSize: { xs: "2.4rem", sm: "3.2rem", md: "3.75rem" },
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                mb: 4,
              }}
            >
              <AnimatedHeadline />
            </Box>

            {/* Subtitle */}
            <Typography
              component={motion.p}
              variants={itemVariants}
              variant="subtitle1"
              sx={{
                mx: "auto",
                maxWidth: 600,
                lineHeight: 1.75,
                color: "rgba(255,255,255,0.6)",
                mb: 5,
              }}
            >
              Experience the next generation of AI conversation. CooperativeAI blends speed,
              depth, and intelligence to help you think, create, and accomplish more.
            </Typography>

            {/* CTA buttons */}
            <Box
              component={motion.div}
              variants={itemVariants}
              sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}
            >
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Button
                  component={Link}
                  to={auth?.isLoggedIn ? "/chat" : "/login"}
                  variant="contained"
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 3,
                    fontSize: "1rem",
                    fontWeight: 700,
                    textTransform: "none",
                    background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
                    boxShadow: "0 0 30px rgba(96,165,250,0.35), 0 4px 20px rgba(0,0,0,0.4)",
                    color: "white",
                  }}
                  className="hero-cta-btn"
                >
                  {auth?.isLoggedIn ? "Open Chat →" : "Get Started Free →"}
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Button
                  component={Link}
                  to="/login"
                  variant="outlined"
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 3,
                    fontSize: "1rem",
                    fontWeight: 600,
                    textTransform: "none",
                    borderColor: "rgba(255,255,255,0.12)",
                    color: "rgba(255,255,255,0.75)",
                    background: "rgba(255,255,255,0.04)",
                    backdropFilter: "blur(8px)",
                  }}
                  className="hero-secondary-btn"
                >
                  Sign In
                </Button>
              </motion.div>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* ================================================================
          STATS STRIP
      ================================================================ */}
      <Box
        component="section"
        sx={{
          position: "relative",
          zIndex: 5,
          py: 6,
        }}
      >
        <Container maxWidth="md">
          <Grid container spacing={4} justifyContent="center">
            {stats.map((s, i) => (
              <Grid item xs={6} sm={3} key={i}>
                <StatItem value={s.value} label={s.label} suffix={s.suffix} delay={i * 0.1} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ================================================================
          FEATURES SECTION
      ================================================================ */}
      <Box
        component="section"
        sx={{
          position: "relative",
          zIndex: 5,
          py: 8,
        }}
      >
        <Container maxWidth="md">
          {/* Section label */}
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            sx={{ textAlign: "center", mb: 6 }}
          >
            <Typography
              variant="overline"
              sx={{
                display: "inline-block",
                px: 2,
                py: 0.5,
                borderRadius: "999px",
                bgcolor: "rgba(167,139,250,0.1)",
                border: "1px solid rgba(167,139,250,0.22)",
                color: "rgba(167,139,250,0.9)",
                fontWeight: 600,
                letterSpacing: "0.06em",
                mb: 2,
                lineHeight: 1.5,
              }}
            >
              Why CooperativeAI
            </Typography>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                color: "rgba(255,255,255,0.92)",
                letterSpacing: "-0.025em",
                mb: 2,
              }}
            >
              Everything you need from an AI assistant
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                color: "rgba(255,255,255,0.5)",
                maxWidth: 500,
                mx: "auto",
              }}
            >
              Designed for modern workflows — fast, smart, and always on.
            </Typography>
          </Box>

          <Grid container spacing={5} alignItems="stretch">
            {features.map((f, i) => (
              <Grid item xs={12} sm={6} key={i} sx={{ display: "flex" }}>
                <FeatureCard
                  icon={f.icon}
                  title={f.title}
                  description={f.description}
                  delay={f.delay}
                  gradient={f.gradient}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ================================================================
          BOTTOM CTA BANNER
      ================================================================ */}
      <Box
        component="section"
        sx={{
          position: "relative",
          zIndex: 5,
          pt: 6,
          pb: 10,
        }}
      >
        <Container maxWidth="md">
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            sx={{
              position: "relative",
              borderRadius: 4,
              py: 6,
              px: 3,
              bgcolor: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              overflow: "hidden",
              textAlign: "center",
            }}
          >
            {/* Background glow inside card */}
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                background: "radial-gradient(ellipse at 50% 100%, rgba(96,165,250,0.12) 0%, transparent 60%)",
                pointerEvents: "none",
              }}
            />
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                color: "rgba(255,255,255,0.92)",
                letterSpacing: "-0.025em",
                mb: 2,
              }}
            >
              Ready to start a smarter conversation?
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                maxWidth: 480,
                mx: "auto",
                color: "rgba(255,255,255,0.5)",
                mb: 4,
              }}
            >
              Join users who've upgraded how they think, create, and collaborate with AI.
            </Typography>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} style={{ display: "inline-block" }}>
              <Button
                component={Link}
                to={auth?.isLoggedIn ? "/chat" : "/login"}
                variant="contained"
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 3,
                  fontSize: "1rem",
                  fontWeight: 700,
                  textTransform: "none",
                  background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
                  boxShadow: "0 0 40px rgba(96,165,250,0.3), 0 4px 20px rgba(0,0,0,0.4)",
                  color: "white",
                }}
                className="hero-cta-btn"
              >
                {auth?.isLoggedIn ? "Go to Chat →" : "Create Free Account →"}
              </Button>
            </motion.div>
          </Box>
        </Container>
      </Box>

      {/* Footer strip */}
      <Box
        component="footer"
        sx={{
          position: "relative",
          zIndex: 5,
          textAlign: "center",
          py: 3,
          px: 2,
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.3)" }}>
          © {new Date().getFullYear()} CooperativeAI. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Home;