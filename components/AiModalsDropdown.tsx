"use client";
import React, { useState } from "react";
import {
  MenuItem,
  Select,
  ListItemIcon,
  ListItemText,
  Box,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { ChatGPTai, Claudeai, Geminiai, Copilotai } from "../utils/logos";
import { GiSpermWhale } from "react-icons/gi";

const models = [
  { id: "gpt4", name: "ChatGPT 4", icon: <ChatGPTai /> },
  { id: "claude", name: "Claude", icon: <Claudeai /> },
  { id: "copilot", name: "CoPilot", icon: <Copilotai /> },
  { id: "gemini", name: "Gemini", icon: <Geminiai /> },
  {
    id: "deepseek",
    name: "Deepseek",
    icon: <GiSpermWhale className="text-[#2063FF]" />,
  },
];

export default function ModelDropdown() {
  const [selected, setSelected] = useState("claude");

  return (
    <Box sx={{ borderRadius: "24px" }} className="md:w-[133px] w-[100px]">
      <Select
        fullWidth
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        displayEmpty
        renderValue={(value) => {
          const item = models.find((m) => m.id === value);
          return (
            <Box display="flex" alignItems="center" gap={1}>
              <span style={{ fontSize: "18px" }}>{item?.icon}</span>
              <p className="md:text-[18px] text-[12px]">{item?.name}</p>
            </Box>
          );
        }}
        sx={{
          borderRadius: "24px",
          bgcolor: "background.paper",
          "& .MuiSelect-outlined": { display: "flex", alignItems: "center" },
        }}
      >
        {models.map((model) => (
          <MenuItem key={model.id} value={model.id}>
            <ListItemIcon>
              <span style={{ fontSize: "18px" }}>{model.icon}</span>
            </ListItemIcon>
            <p className="text-[18px]">{model.name}</p>
            {selected === model.id && (
              <CheckIcon sx={{ marginLeft: "auto", color: "primary.main" }} />
            )}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}
