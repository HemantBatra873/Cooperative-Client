import { Box, Typography, useMediaQuery, useTheme, Theme } from "@mui/material";
import { AiOutlineLike, AiFillLike, AiOutlineDislike, AiFillDislike, AiOutlineCopy, AiOutlineSound, AiOutlineExclamationCircle } from "react-icons/ai";
import React, { useRef, useState } from 'react';
import AnimatedThinkingText from "./ThinkingAnimation";
import toast from "react-hot-toast";
import CodeBlock from "./CodeBlock";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ChatItemProps {
  content: string;
  role: "user" | "model";
  loading?: boolean;
  generating?: boolean;
}

const ChatItem: React.FC<ChatItemProps> = ({ content, role, loading, generating }) => {
  const theme: Theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  // State for feedback
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const speechUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Handle listen button (Text-to-Speech)
  const handleListen = () => {
    if (!("speechSynthesis" in window)) {
      toast.error("Text-to-speech not supported in this browser!");
      return;
    }

    if (isSpeaking) {
      // Stop speaking
      speechSynthesis.cancel();
      setIsSpeaking(false);
      toast("🛑 Reading stopped");
    } else {
      // Start speaking
      const utterance = new SpeechSynthesisUtterance(content);
      utterance.onend = () => setIsSpeaking(false); // Reset state when done
      speechUtteranceRef.current = utterance;
      speechSynthesis.speak(utterance);
      setIsSpeaking(true);
      toast("🎵 Playing response...");
    }
  };

  // Handle report button
  const handleReport = () => {
    toast("Report sent for review!", { icon: "⚠️" });
  };

  // Handle like button
  const handleLike = () => {
    setLiked(true);
    setDisliked(false); // Reset dislike
    toast.success("You liked the response!");
  };

  // Handle dislike button
  const handleDislike = () => {
    setDisliked(true);
    setLiked(false); // Reset like
    toast.error("You disliked the response!");
  };

  // Handle copy button
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      toast.success("Copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy!");
    }
  };


  const userStyles = {
    MaxWidth: isMobile ? "250px" : "500px",
    bgcolor: "var(--bg-secondary)",
    color: "var(--text-primary)",
    px: 2,
    borderRadius: "16px",
  };

  const modelStyles = {
    width: "100%",
    paddingBottom: '30px',
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: role === "model" ? "flex-start" : "flex-end",
        justifyContent: "flex-start",
        borderRadius: 2,
        maxWidth: "100%",
        wordBreak: "break-word", // Ensures long words wrap properly
      }}
    >
      {role === "model" && <img src="/logow.svg" alt="ai" width={isMobile ? 120 : 140} />}
      <Box sx={role === "user" ? userStyles : modelStyles}>


        {role === "model" && loading ? (
          <AnimatedThinkingText />
        ) : (
          <Box
            sx={{
              fontSize: "16px",
              color: "var(--text-primary)",
              fontWeight: "400",
              "& p": { marginY: "10px" },
              "& h1, & h2, & h3, & h4, & h5, & h6": { marginY: "15px", fontWeight: "bold" },
              "& ul, & ol": { paddingLeft: "20px", marginY: "10px" },
              "& li": { marginY: "5px" },
              "& strong": { fontWeight: "bold" },
              "& a": { color: "#1976d2", textDecoration: "none" },
              "& a:hover": { textDecoration: "underline" },
            }}
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code({ node, inline, className, children, ...props }: any) {
                  const match = /language-(\w+)/.exec(className || "");
                  return !inline && match ? (
                    <CodeBlock
                      content={String(children).replace(/\n$/, "")}
                      language={match[1]}
                    />
                  ) : (
                    <code 
                      className={className} 
                      {...props}
                      style={{
                        backgroundColor: "rgba(128, 128, 128, 0.2)",
                        padding: "2px 4px",
                        borderRadius: "4px",
                        fontFamily: "monospace",
                      }}
                    >
                      {children}
                    </code>
                  );
                },
              }}
            >
              {content}
            </ReactMarkdown>
          </Box>
        )}

        {role === "model" && !generating && (
          <Box
            sx={{
              display: "flex",
              marginTop: "15px",
            }}
          >
            {/* Like Button */}
            <button
              onClick={handleLike}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: "var(--text-secondary)",
                fontSize: "18px",
              }}
            >
              {liked ? <AiFillLike /> : <AiOutlineLike />}
            </button>

            {/* Dislike Button */}
            <button
              onClick={handleDislike}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: "var(--text-secondary)",
                fontSize: "18px",
              }}
            >
              {disliked ? <AiFillDislike /> : <AiOutlineDislike />}
            </button>

            {/* Copy Button */}
            <button
              onClick={handleCopy}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: "var(--text-secondary)",
                fontSize: "18px",
              }}
            >
              <AiOutlineCopy />
            </button>

            {/* Listen Button */}
            <button
              onClick={handleListen}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: isSpeaking ? "var(--text-primary)" : "var(--text-secondary)",
                fontSize: "18px",
              }}
            >
              <AiOutlineSound />
            </button>

            {/* Report Button */}
            <button
              onClick={handleReport}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: "var(--text-secondary)",
                fontSize: "18px",
              }}
            >
              <AiOutlineExclamationCircle />
            </button>
          </Box>
        )}

      </Box>

    </Box>
  );
};


export default ChatItem;