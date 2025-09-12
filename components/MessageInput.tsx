"use client";

import React, { useState, useEffect } from "react";
import { Box, TextField, IconButton } from "@mui/material";
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
      sx={{ display: "flex", gap: 1 }}
    >
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Type your message..."
        value={message}
        onChange={handleChange}
        size="small"
      />
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
        }}
      >
        <SendIcon />
      </IconButton>
    </Box>
  );
};

export default MessageInput;
