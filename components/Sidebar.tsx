"use client";

import React from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
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
import { BorderLeft } from "@mui/icons-material";
import { Logo, ChatGPT, ChatingIcon, ControlH } from "@/utils/logos";

const Sidebar: React.FC = () => {
  const { chats, currentChat, createNewChat, selectChat } = useChat();
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const drawerWidth = 300;
  const miniDrawerWidth = 64;

  const DrawerList = (
    <Box
      sx={{
        width: drawerWidth,
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
        sx={{ "& > :not(style)": { m: 1, width: "25ch", marginLeft: 3 } }}
        noValidate
        autoComplete="off"
      >
        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      </Box>
      <Box
        component="form"
        sx={{ "& > :not(style)": { m: 1, width: "30ch", marginLeft: 2, paddingX: 3, border: "2px solid #F3F3F3", padding: 1, borderRadius: 2 } }}
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
        sx={{ "& > :not(style)": { m: 1, width: "30ch", marginLeft: 2, paddingX: 3, border: "2px solid #F3F3F3", padding: 1, borderRadius: 2 } }}
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
        sx={{ "& > :not(style)": { width: "30ch", marginLeft: 2, paddingX: 3, border: "2px solid #F3F3F3", padding: 1, borderRadius: 2 } }}
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
        sx={{ "& > :not(style)": { m: 1, width: "30ch", marginLeft: 2, paddingX: 3, border: "2px solid #F3F3F3", padding: 1, borderRadius: 2 } }}
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

      {/* Chat List */}
      <Box sx={{ overflow: "auto", flexGrow: 1 }}>
        <List>
          {chats.map((chat) => (
            <ListItem key={chat.id} disablePadding>
              <ListItemButton
                selected={currentChat?.id === chat.id}
                onClick={() => {
                  selectChat(chat.id);
                  if (isMobile) {
                    setOpen(false);
                  }
                }}
                sx={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                <ListItemIcon>
                  <ChatIcon />
                </ListItemIcon>
                <ListItemText
                  primary={chat.title}
                  secondary={
                    chat.messages.length > 0
                      ? `${chat.messages.length} messages`
                      : "No messages yet"
                  }
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
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
