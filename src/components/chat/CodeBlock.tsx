import { Box, Typography } from "@mui/material";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { AiTwotoneCopy } from "react-icons/ai";
import { useState } from "react";
import toast from "react-hot-toast";

const CodeBlock = ({ content, language = "javascript" }: { content: string; language?: string }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(content);
            setCopied(true);
            toast.success("Copied to clipboard!");
            setTimeout(() => setCopied(false), 2000); // Reset copied state
        } catch (error) {
            toast.error("Failed to copy!");
        }
    };

    return (
        <Box
            sx={{
                overflowX: "auto",
                fontFamily: "PT Sans , Roboto Slab , serif",
                borderRadius: "16px",
                background: "var(--bg-secondary)",
                position: "relative",
                padding: "15px",
                marginTop: "30px",
            }}
        >
            {/* Header with Language and Copy Button */}
            <Box
                sx={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "8px 12px",
                    background: "transparent",
                    boxSizing: "border-box",
                }}
            >
                <Typography sx={{ color: "var(--text-secondary)", fontSize: "21px", fontWeight: "600" }}>{language}</Typography>
                <button
                    onClick={handleCopy}
                    style={{
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        color: copied ? "var(--text-primary)" : "var(--text-secondary)",
                        fontSize: "21px",
                    }}
                >
                    <AiTwotoneCopy />
                </button>
            </Box>

            {/* Code Block */}
            <SyntaxHighlighter
                style={coldarkDark}
                language={language}
                className="syntax-highlighter"
                customStyle={{
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                    overflowX: "auto",
                    padding: "10px",
                    borderRadius: "0 0 10px 10px",
                }}
            >
                {content}
            </SyntaxHighlighter>

        </Box>
    );
};

export default CodeBlock;
