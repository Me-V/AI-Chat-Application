"use client";

import React, { useState } from "react";
import { Box, Paper, Tooltip, Typography } from "@mui/material";
import { useChat } from "@/contexts/ChatContext";
import MessageList from "../components/MessageList";
import MessageInput from "../components/MessageInput";
import {
  AttachIcon,
  HelpIcon,
  ShareIcon,
  StarsFilledIcon,
  StarsIcon,
} from "@/utils/logos";
import { IoAddOutline } from "react-icons/io5";
import { GrAttachment } from "react-icons/gr";
import { MdCameraAlt, MdKeyboardArrowDown } from "react-icons/md";
import AttachmentsSection from "./AttachmentsSection";
import AiModalsDropdown from "./AiModalsDropdown";

const ChatContainer: React.FC = () => {
  const { currentChat, createNewChat } = useChat();
  const [selected, setSelected] = useState<number | null>(null);
  const [inputText, setInputText] = useState("");
  const [showAttachments, setShowAttachments] = useState(false); // State to control attachments visibility

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
    setInputText(promptText);
  };

  const handleInputChange = (text: string) => {
    setInputText(text);
    if (
      selected !== null &&
      text !== prompts.find((p) => p.id === selected)?.text
    ) {
      setSelected(null);
    }
  };

  const handleSendMessage = () => {
    setInputText("");
    setSelected(null);
  };

  const toggleAttachments = () => {
    setShowAttachments(!showAttachments);
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
          p: { xs: 1, sm: 2 },
          borderBottom: "1px solid",
          borderColor: "divider",
          backgroundColor: "background.default",
          height: { xs: "50px", sm: "60px" },
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <AiModalsDropdown />  
        <Typography variant="h6" className="flex items-center gap-2">
          {currentChat?.title || "New Chat"}
          <MdKeyboardArrowDown />
        </Typography>
        <div className="flex items-center gap-2 sm:gap-3">
          <ShareIcon className="hidden xs:block" />
          <HelpIcon className="hidden xs:block" />
          <button
            onClick={createNewChat}
            className="h-[32px] sm:h-[36px] px-3 sm:w-[105px] bg-[#2063FF] flex items-center justify-center rounded-full cursor-pointer"
          >
            <IoAddOutline className="text-white" size={18} />
            <span className="text-white text-[13px] sm:text-[14px] font-semibold">
              New Chat
            </span>
          </button>
        </div>
      </Paper>

      {/* Message List */}
      <Box sx={{ flexGrow: 1, overflow: "auto", height: "100%" }}>
        {currentChat ? (
          <div className="mx-[25%]"><MessageList messages={currentChat.messages} /></div>
        ) : (
          <div className="flex items-center justify-center px-4">
            <div className="p-4 sm:p-8 flex flex-col items-center justify-center w-full max-w-5xl">
              {/* Greeting + Title */}
              <div className="md:pl-36 pl-0 text-start mb-6 sm:mb-8 w-full">
                <h2 className="text-[22px] sm:text-[28px] font-bold mb-2">
                  👋 Hi <span className="font-extrabold">Laurence!</span>
                </h2>

                <h1 className="text-[28px] sm:text-[40px] font-bold leading-tight text-start">
                  What do you want to <br className="hidden sm:block" /> learn
                  today?
                </h1>
              </div>

              {/* Cards */}
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
                {prompts.map((prompt) => (
                  <div
                    key={prompt.id}
                    onClick={() => handlePromptSelect(prompt.id, prompt.text)}
                    className={`flex flex-col justify-between rounded-2xl border w-full sm:w-[220px] h-[180px] sm:h-[236px] p-4 cursor-pointer transition
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
                    {selected === prompt.id ? (
                      <StarsFilledIcon />
                    ) : (
                      <StarsIcon />
                    )}
                    <p className="mt-8 sm:mt-12 text-[14px] sm:text-[16px] text-gray-800 font-bold">
                      {prompt.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Box>

      {/* Message Input Area */}
      <Box
        sx={{
          position: "sticky",
          bottom: 0,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          backgroundColor: "background.default",
          zIndex: 10,
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: { xs: 1, sm: 2 },
            mx: { xs: 1, sm: 2 },
            mb: { xs: 1, sm: 2 },
            border: "1px solid",
            borderColor: "divider",
            backgroundColor: "background.default",
            borderRadius: "16px",
            width: { xs: "100%", sm: "692px" },
            minHeight: showAttachments ? "auto" : { xs: "100px", sm: "128px" },
          }}
        >
          {/* Attachments Section - Conditionally rendered */}
          {showAttachments && (
            <Box sx={{ mb: 2 }}>
              <AttachmentsSection />
            </Box>
          )}

          {/* Message Input */}
          <MessageInput
            initialText={inputText}
            onTextChange={handleInputChange}
            onSendMessage={handleSendMessage}
          />

          {/* Attachment and Camera Icons */}
          <div className="flex gap-2 mt-2">
            <Tooltip title="Attach File">
              <GrAttachment
                className="mt-2 ml-1 cursor-pointer"
                onClick={toggleAttachments}
                style={{ color: showAttachments ? "#2063FF" : "inherit" }}
              />
            </Tooltip>
            <Tooltip title="Camera">
              <MdCameraAlt className="mt-2 ml-1 cursor-pointer" size={18} />
            </Tooltip>
          </div>
        </Paper>
      </Box>
    </Box>
  );
};

export default ChatContainer;
