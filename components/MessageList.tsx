"use client";

import React, { useEffect, useRef } from "react";
import { Box, Paper, Typography, Avatar } from "@mui/material";
import { Message } from "@/types";
import Image from "next/image";
import { DownloadIcon, SourcesPlaceholder } from "@/utils/logos";
import DescriptionIcon from "@mui/icons-material/Description";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { FiDownload } from "react-icons/fi";

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getFileIcon = (type: string) => {
    if (type.includes("image")) {
      return null;
    } else if (type.includes("pdf")) {
      return <PictureAsPdfIcon sx={{ color: "#f40f02", fontSize: 20 }} />;
    } else if (type.includes("word") || type.includes("document")) {
      return <DescriptionIcon sx={{ color: "#2962ff", fontSize: 20 }} />;
    }
    return <InsertDriveFileIcon sx={{ color: "#666", fontSize: 20 }} />;
  };

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
              // maxWidth: "70%",
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

              {/* Attachments */}
              {/* Attachments */}
              {message.attachments && message.attachments.length > 0 && (
                <Box
                  sx={{
                    mt: 2,
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap", // allows wrapping if many
                    gap: 1, // spacing between items
                  }}
                >
                  {message.attachments.map((attachment) => (
                    <Box
                      key={attachment.id}
                      sx={{
                        display: "flex",
                        alignItems: "center",

                        backgroundColor: "rgba(255, 255, 255, 0.5)",
                        borderRadius: 1,
                        gap: 1,
                      }}
                    >
                      {attachment.type.includes("image") &&
                      attachment.preview ? (
                        <Box
                          sx={{
                            
                            borderRadius: 1,
                            overflow: "hidden",
                            position: "relative",
                          }}
                          className="w-[200px] h-[200px] md:w-[312px] md:h-[312px]"
                        >
                          <Image
                            src={attachment.preview}
                            alt={attachment.name}
                            width={312}
                            height={312}
                            className="rounded object-cover"
                          />
                          <Box
                            sx={{
                              position: "absolute",
                              top: 8,
                              right: 8,
                              backgroundColor: "rgba(255, 255, 255, 0.8)",
                              borderRadius: "50%",
                              padding: "6px",
                              cursor: "pointer",
                              transition: "0.2s",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              "&:hover": {
                                backgroundColor: "rgba(255, 255, 255, 1)",
                              },
                            }}
                          >
                            <DownloadIcon />
                          </Box>
                        </Box>
                      ) : (
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: "column",
                            p: 2,
                            borderRadius: 2, // optional, looks nicer with curves
                            background:
                              "conic-gradient(from 154.61deg at 80.43% -12.04%, #D9E4FF -93.6deg, #F8F9FC 42.55deg, #FFDDF8 157.8deg, #D9E4FF 266.4deg, #F8F9FC 402.55deg)",
                          }}
                        >
                          {attachment.type.includes("pdf") ? (
                            <p className="text-[14px] text-[#D246B6] font-semibold">
                              PDF
                            </p>
                          ) : (
                            <p className="text-[14px] text-[#0440CB] font-semibold">
                              DOCX
                            </p>
                          )}
                          <Typography
                            variant="body2"
                            noWrap
                            sx={{ fontWeight: "medium" }}
                            className="text-[#989898]"
                          >
                            {attachment.name}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  ))}
                </Box>
              )}
            </Paper>
          </Box>
        </Box>
      ))}
      <div ref={endOfMessagesRef} />
    </Box>
  );
};

export default MessageList;
