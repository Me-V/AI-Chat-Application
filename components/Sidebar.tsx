"use client";

import React, { useState } from "react";
import {
  Box,
  Drawer,
  IconButton,
  Typography,
  Divider,
  Tooltip,
  useMediaQuery,
  useTheme,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import MenuIcon from "@mui/icons-material/Menu";
import ChatIcon from "@mui/icons-material/Chat";
import HistoryIcon from "@mui/icons-material/History";
import { useChat } from "@/contexts/ChatContext";
import { Logo, ChatingIcon, ControlH, ProfileAsset } from "@/utils/logos";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoIosRocket } from "react-icons/io";
import Image from "next/image";

const Sidebar: React.FC = () => {
  const { chats, currentChat, createNewChat, selectChat } = useChat();
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [showAll, setShowAll] = useState(false);

  // show only 3 chats unless "View more" is clicked
  const visibleChats = showAll ? chats : chats.slice(0, 3);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const drawerWidth = 300;
  const miniDrawerWidth = 64;

  const DrawerList = (
    <Box
      sx={{
        // width: drawerWidth,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
      role="presentation"
    >
      {/* Header */}
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
          position: "relative",
        }}
      >
        <Typography variant="h6">
          <Logo />
        </Typography>
        {/* <IconButton onClick={createNewChat} color="primary">
          <AddIcon />
        </IconButton> */}
        <IconButton
          onClick={() => setOpen(false)}
          sx={{
            position: "absolute",
            right: 1,
            top: 14,
            backgroundColor: "#E9EFFF",
            color: "#2063FF",
          }}
        >
          <KeyboardArrowLeftIcon />
        </IconButton>
      </Box>

      <Box
        component="form"
        sx={{ "& > :not(style)": { m: 1, width: "30ch", marginLeft: 2 } }}
        noValidate
        autoComplete="off"
      >
        <TextField id="outlined-basic" label="Search" />
      </Box>
      <Box
        component="form"
        sx={{
          "& > :not(style)": {
            m: 1,
            width: "30ch",
            marginLeft: 2,
            paddingX: 3,
            border: "2px solid #F3F3F3",
            padding: 1,
            borderRadius: 2,
          },
        }}
        noValidate
        autoComplete="off"
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ChatingIcon />
            <span style={{ marginLeft: "10px" }}>Home</span>
          </Box>
          <ControlH />
        </Box>
      </Box>
      <Box
        component="form"
        sx={{
          "& > :not(style)": {
            m: 1,
            width: "30ch",
            marginLeft: 2,
            paddingX: 3,
            border: "2px solid #F3F3F3",
            padding: 1,
            borderRadius: 2,
          },
        }}
        noValidate
        autoComplete="off"
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* <fileIcon /> */}
            <span style={{ marginLeft: "10px" }}>Library</span>
          </Box>
          <ControlH />
        </Box>
      </Box>
      <Box
        component="form"
        sx={{
          "& > :not(style)": {
            width: "30ch",
            marginLeft: 2,
            paddingX: 3,
            border: "2px solid #F3F3F3",
            padding: 1,
            borderRadius: 2,
          },
        }}
        noValidate
        autoComplete="off"
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ChatingIcon />
            <span style={{ marginLeft: "10px" }}>History</span>
          </Box>
          <ControlH />
        </Box>
      </Box>
      <Box
        component="form"
        sx={{
          "& > :not(style)": {
            m: 1,
            width: "30ch",
            marginLeft: 2,
            paddingX: 3,
            border: "2px solid #F3F3F3",
            padding: 1,
            borderRadius: 2,
          },
        }}
        noValidate
        autoComplete="off"
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ChatingIcon />
            <span className="text-[16px]" style={{ marginLeft: "10px" }}>
              Explore
            </span>
          </Box>
          <ControlH />
        </Box>
      </Box>

      {/* Chat List */}
      <div className="flex-1 overflow-auto my-2">
        {visibleChats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => {
              selectChat(chat.id);
              if (isMobile) {
                setOpen(false);
              }
            }}
            className={`flex items-center gap-3 mb-1 mx-5 px-4 py-2 cursor-pointer rounded-lg ${
              currentChat?.id === chat.id ? "border border-[#EBEBEB]" : ""
            }`}
          >
            <div className="flex flex-col truncate">
              <span className="font-medium truncate text-[12px]">
                {chat.title}
              </span>
            </div>
          </div>
        ))}

        {/* View more / less toggle */}
        {chats.length > 3 && (
          <div className="mx-5 mt-2 flex ">
            <button
              onClick={() => setShowAll((prev) => !prev)}
              className="text-sm text-gray-700 hover:bg-gray-100 ml-1 cursor-pointer"
            >
              {showAll ? "View less" : "View more"}
            </button>
            <FaArrowRightLong className="mt-1 ml-2 cursor-pointer" />
          </div>
        )}
      </div>

      <div className="flex justify-between items-center bg-gradient-to-tr from-[#F8F9FC] via-[#FFDDF8] to-[#D9E4FF] border border-[#EBEBEB] mb-2 mx-5 py-2 px-3 rounded-lg">
        <div className="flex flex-col justify-start items-start">
          <span className="text-[#515151] font-bold text-[16px]">Try Pro!</span>
          <span className="text-[#717171] text-[14px]">
            Unlock advanced features
          </span>
        </div>
        <IoIosRocket />
      </div>
      <div className="flex justify-between items-center border border-[#EBEBEB] my-3 mx-5 py-2 px-3 rounded-lg">
        <div className="flex justify-start items-center">
          <Image
            src="/profilePic.jpg"
            alt="Profile"
            width={36}
            height={36}
            className="rounded-full"
          />
          <span className="text-[Greyscale/800] text-[16px] ml-1">
            Lawrence Cruz
          </span>
        </div>
        <ProfileAsset />
      </div>
    </Box>
  );

  const MiniDrawer = (
    <Box
      sx={{
        width: miniDrawerWidth,
        height: "100vh",
        borderRight: "1px solid",
        borderColor: "divider",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        py: 2,
        gap: 2,
        flexShrink: 0,
      }}
    >
      <Tooltip title="Open sidebar" placement="right">
        <IconButton onClick={toggleDrawer(true)}>
          <MenuIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="New chat" placement="right">
        <IconButton onClick={createNewChat} color="primary">
          <AddIcon />
        </IconButton>
      </Tooltip>

      <Divider sx={{ width: "80%" }} />

      <Box sx={{ flexGrow: 1, overflow: "auto", width: "100%" }}>
        {chats.slice(0, 8).map((chat, index) => (
          <Tooltip key={chat.id} title={chat.title} placement="right">
            <IconButton
              onClick={() => selectChat(chat.id)}
              sx={{
                width: "100%",
                borderRadius: 0,
                color: currentChat?.id === chat.id ? "primary.main" : "inherit",
              }}
            >
              <ChatIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        ))}
      </Box>

      <Tooltip title="Chat history" placement="right">
        <IconButton>
          <HistoryIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );

  return (
    <>
      {/* Permanent mini drawer */}
      {!open && MiniDrawer}

      {/* Temporary drawer for mobile, persistent for desktop */}
      <Drawer
        variant={isMobile ? "temporary" : "persistent"}
        open={open}
        onClose={toggleDrawer(false)}
        sx={{
          width: open ? drawerWidth : 0,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            position: "relative",
            zIndex: 1,
          },
        }}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        {DrawerList}
      </Drawer>
    </>
  );
};

export default Sidebar;
