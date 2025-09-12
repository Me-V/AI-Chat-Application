"use client";

import React, { useState } from "react";
import { Box, Paper, Typography } from "@mui/material";
import { useChat } from "@/contexts/ChatContext";
import MessageList from "../components/MessageList";
import MessageInput from "../components/MessageInput";
import {
  HelpIcon,
  Logo,
  ShareIcon,
  StarsFilledIcon,
  StarsIcon,
} from "@/utils/logos";
import { IoAddOutline } from "react-icons/io5";

const ChatContainer: React.FC = () => {
  const { currentChat, isNewChat, createNewChat } = useChat();
  const [selected, setSelected] = useState<number | null>(null);
  const [inputText, setInputText] = useState(""); // State to control the input text

  const prompts = [
    { id: 1, text: "Give me a concise summary of this meeting transcript" },
    { id: 2, text: "Write a product description for a minimalist smartwatch" },
    {
      id: 3,
      text: "Provide a polite response to a customer asking for a refund",
    },
  ];

  const handlePromptSelect = (promptId: number, promptText: string) => {
    setSelected(promptId);
    setInputText(promptText); // Set the input text to the selected prompt
  };

  const handleInputChange = (text: string) => {
    setInputText(text);
    // If user starts typing, deselect the prompt
    if (
      selected !== null &&
      text !== prompts.find((p) => p.id === selected)?.text
    ) {
      setSelected(null);
    }
  };

  const handleSendMessage = () => {
    // Reset input text after sending
    setInputText("");
    setSelected(null);
  };

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
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div className="h-9 w-24 bg-gray-200 rounded-full"></div>

        <div className="flex items-center gap-3">
          <ShareIcon />
          <HelpIcon />
          <button
            onClick={createNewChat}
            className="h-[36px] w-[105px] bg-[#2063FF] flex items-center justify-center rounded-full gap-1 cursor-pointer"
          >
            <IoAddOutline className="text-white" size={18} />
            <span className="text-white text-[14px] font-semibold">
              New Chat
            </span>
          </button>
        </div>
      </Paper>

      {/* Message List */}
      <Box sx={{ flexGrow: 1, overflow: "auto", height: "100%" }}>
        {currentChat ? (
          <MessageList messages={currentChat.messages} />
        ) : (
          <div className="p-8 flex flex-col justify-center h-full ml-96">
            {/* Greeting */}
            <div className="text-start items-start">
              <h2 className="text-[28px] font-bold mb-2">
                👋 Hi <span className="font-extrabold">Laurence!</span>
              </h2>

              {/* Main Title */}
              <h1 className="text-[40px] font-bold leading-tight mb-8">
                What do you want to <br /> learn today?
              </h1>
            </div>

            {/* Cards */}
            <div className="flex gap-4">
              {prompts.map((prompt) => (
                <div
                  key={prompt.id}
                  onClick={() => handlePromptSelect(prompt.id, prompt.text)}
                  className={`flex flex-col justify-between rounded-2xl border w-[220px] h-[236px] p-4 cursor-pointer transition
                    ${
                      selected === prompt.id
                        ? "border-blue-500 border-2"
                        : "border-transparent hover:border-[#96B6FF]"
                    }`}
                  style={{
                    background:
                      "conic-gradient(from 154.61deg at 80.43% -12.04%, #D9E4FF -93.6deg, #F8F9FC 42.55deg, #FFDDF8 157.8deg, #D9E4FF 266.4deg, #F8F9FC 402.55deg)",
                  }}
                >
                  {/* Top icon circle */}
                  {selected === prompt.id ? <StarsFilledIcon /> : <StarsIcon />}

                  {/* Text */}
                  <p className="mt-12 text-[16px] text-gray-800 font-bold">
                    {prompt.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
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
        <MessageInput
          initialText={inputText}
          onTextChange={handleInputChange}
          onSendMessage={handleSendMessage}
        />
      </Paper>
    </Box>
  );
};

export default ChatContainer;
