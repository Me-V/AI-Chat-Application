import React, { useState, useRef, useCallback } from "react";
import { Paper, IconButton, Box, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import AddIcon from "@mui/icons-material/Add";
import { IoMdAdd } from "react-icons/io";
import { TrashIcon } from "@/utils/logos";
import { FiMinus } from "react-icons/fi";
import { GrAttachment } from "react-icons/gr";

interface Attachment {
  id: string;
  name: string;
  size: string;
  progress?: number;
}

const AttachmentsSection: React.FC = () => {
  const [attachments, setAttachments] = useState<Attachment[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  }, []);

  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    const files = Array.from(e.clipboardData.files);
    if (files.length > 0) {
      e.preventDefault();
      handleFiles(files);
    }
  }, []);

  const handleFiles = (files: File[]) => {
    const newAttachments: Attachment[] = files.map((file, index) => ({
      id: Date.now() + index.toString(),
      name: file.name,
      size: formatFileSize(file.size),
      progress: 0,
    }));

    setAttachments((prev) => [...prev, ...newAttachments]);

    // Simulate upload progress
    newAttachments.forEach((attachment, index) => {
      simulateUpload(attachment.id);
    });
  };

  const simulateUpload = (id: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 10;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
      }

      setAttachments((prev) =>
        prev.map((att) => (att.id === id ? { ...att, progress } : att))
      );
    }, 200);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const deleteAllAttachments = () => {
    setAttachments([]);
  };

  const deleteAttachment = (id: string) => {
    setAttachments((prev) => prev.filter((att) => att.id !== id));
  };

  const handleAddClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      handleFiles(files);
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        border: "1px dashed",
        borderColor: "divider",
        backgroundColor: "background.paper",
        borderRadius: 2,
        mb: 2,
      }}
      onDrop={handleDrop}
      onPaste={handlePaste}
      onDragOver={(e) => e.preventDefault()}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: "medium" }}>
          Attached Files
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {/* Camera icon (non-functional) */}
          <IconButton
            onClick={deleteAllAttachments}
            size="small"
            sx={{ color: "text.secondary" }}
          >
            <TrashIcon />
          </IconButton>

          {/* Add button */}
          <IconButton
            size="small"
            sx={{
              color: "text.secondary",
              border: "1px solid",
              borderColor: "#F8F9FC",
              borderRadius: 3,
              p: 1,
              display: "flex",
              alignItems: "center",
              gap: 1,
              backgroundColor: "#F8F9FC",
            }}
            onClick={handleAddClick}
          >
            <span className="text-[12px] text-[#0440CB] font-semibold">
              Add
            </span>
            <IoMdAdd size={16} color="#0440CB" />
          </IconButton>

          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileInputChange}
            multiple
            style={{ display: "none" }}
          />
        </Box>
      </Box>

      {/* Attachments list */}
      <Box sx={{ mb: 2 }}>
        {attachments.map((attachment) => (
          <Box
            key={attachment.id}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              p: 1,
              mb: 1,

              borderColor: "divider",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                flexGrow: 1,
              }}
            >
              <GrAttachment />
              <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                <Typography
                  variant="body2"
                  noWrap
                  sx={{ fontWeight: "medium" }}
                >
                  {attachment.name}
                </Typography>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  {/* {attachment.size} */}
                </Typography>
                {/* {attachment.progress !== undefined && attachment.progress < 100 && (
                  <Box sx={{ width: '100%', height: 2, backgroundColor: 'grey.200', mt: 0.5 }}>
                    <Box 
                      sx={{ 
                        height: '100%', 
                        backgroundColor: '#2063FF',
                        width: `${attachment.progress}%`,
                        transition: 'width 0.3s ease'
                      }} 
                    />
                  </Box>
                )} */}
              </Box>
            </Box>
            {attachment.progress !== undefined && attachment.progress < 100 && (
              <span style={{ marginLeft: "8px", color: "#2063FF" }}>
                {Math.floor(attachment.progress)}%
              </span>
            )}

            <IconButton
              size="small"
              onClick={() => deleteAttachment(attachment.id)}
              sx={{ color: "text.secondary" }}
            >
              <FiMinus />
            </IconButton>
          </Box>
        ))}
      </Box>

      {/* Drop zone hint */}
      {attachments.length === 0 && (
        <Box
          onClick={handleAddClick}
          sx={{ textAlign: "center", py: 3, cursor: "pointer" }}
        >
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Drag & drop files here or paste from clipboard
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default AttachmentsSection;
