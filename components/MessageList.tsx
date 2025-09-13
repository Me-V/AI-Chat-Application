"use client";

import React, { useEffect, useRef } from "react";
import { Box, Paper, Typography, Avatar } from "@mui/material";
import { Message } from "@/types";
import Image from "next/image";
import { SourcesPlaceholder } from "@/utils/logos";

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Box sx={{ p: 2 }}>
      {messages.map((message) => (
        <Box
          key={message.id}
          sx={{
            display: "flex",
            justifyContent:
              message.sender === "user" ? "flex-end" : "flex-start",
            mb: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: message.sender === "user" ? "row-reverse" : "row",
              alignItems: "flex-start",
              maxWidth: "70%",
            }}
          >
            <Paper
              elevation={1}
              sx={{
                p: 2,
                bgcolor: message.sender === "user" ? "#E9EFFF" : "#F8F9FC",
                color: message.sender === "user" ? "black" : "#515151",
              }}
              className="rounded-2xl"
            >
              <Typography
                className="flex items-end gap-2"
                variant="body1"
                sx={{
                  flexDirection:
                    message.sender === "assistant" ? "column" : "row",
                }}
              >
                {message.sender === "user" ? (
                  <Image
                    src="/profilePic.jpg"
                    width={32}
                    height={32}
                    alt="User"
                    className="rounded-full"
                  />
                ) : (
                  ""
                )}
                {message.sender === "assistant" && (
                  <span className="flex items-center gap-2">
                    <SourcesPlaceholder />
                  </span>
                )}
                {message.text}
              </Typography>
            </Paper>
          </Box>
        </Box>
      ))}
      <div ref={endOfMessagesRef} />
    </Box>
  );
};

export default MessageList;
