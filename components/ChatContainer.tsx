"use client";

import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import { useChat } from "@/contexts/ChatContext";
import MessageList from "../components/MessageList";
import MessageInput from "../components/MessageInput";

const ChatContainer: React.FC = () => {
  const { currentChat, isNewChat } = useChat();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        flexGrow: 1,
      }}
    >
      {/* Header */}
      <Paper
        elevation={0}
        sx={{
          p: 2,
          borderBottom: "1px solid",
          borderColor: "divider",
          backgroundColor: "background.default",
        }}
      >
        <Typography variant="h6">{currentChat?.title || ""}</Typography>
      </Paper>

      {/* Message List */}
      <Box sx={{ flexGrow: 1, overflow: "auto" }}>
        {currentChat ? (
          <MessageList messages={currentChat.messages} />
        ) : (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              flexDirection: "column",
              color: "text.secondary",
            }}
          >
            <Typography variant="h5" gutterBottom>
              Welcome to Chat App
            </Typography>
            <Typography variant="body1">
              Start a new conversation by sending a message.
            </Typography>
          </Box>
        )}
      </Box>

      {/* Message Input */}
      <Paper
        elevation={0}
        sx={{
          p: 2,
          borderTop: "1px solid",
          borderColor: "divider",
          backgroundColor: "background.default",
        }}
      >
        <MessageInput />
      </Paper>
    </Box>
  );
};

export default ChatContainer;
