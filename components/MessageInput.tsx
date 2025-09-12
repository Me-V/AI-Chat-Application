"use client";

import React, { useState, useEffect } from "react";
import { Box, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useChat } from "@/contexts/ChatContext";

interface MessageInputProps {
  initialText?: string;
  onTextChange?: (text: string) => void;
  onSendMessage?: () => void;
}

const MessageInput: React.FC<MessageInputProps> = ({
  initialText = "",
  onTextChange,
  onSendMessage,
}) => {
  const [message, setMessage] = useState(initialText);
  const { sendMessage } = useChat();

  // Update internal state when initialText changes
  useEffect(() => {
    setMessage(initialText);
  }, [initialText]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage(message);
      setMessage("");
      if (onTextChange) onTextChange("");
      if (onSendMessage) onSendMessage();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    setMessage(newText);
    if (onTextChange) onTextChange(newText);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", gap: 1, alignItems: "center" }}
    >
      {/* Normal input field */}
      <input
        type="text"
        placeholder="Ask me a question..."
        value={message}
        onChange={handleChange}
        className="text-[16px] flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        style={{ height: "75px" }}
      />

      {/* Send Button */}
      <IconButton
        type="submit"
        color="primary"
        disabled={!message.trim()}
        sx={{
          bgcolor: "primary.main",
          color: "white",
          "&:hover": {
            bgcolor: "primary.dark",
          },
          "&:disabled": {
            bgcolor: "action.disabled",
          },
          height: "40px",
          width: "40px",
        }}
      >
        <SendIcon />
      </IconButton>
    </Box>
  );
};

export default MessageInput;
