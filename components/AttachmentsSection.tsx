import React, { useState, useRef, useCallback } from "react";
import { Paper, IconButton, Box, Typography, Button } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { IoMdAdd } from "react-icons/io";
import { TrashIcon } from "@/utils/logos";
import { FiMinus } from "react-icons/fi";
import { GrAttachment } from "react-icons/gr";
import { Attachment } from '@/types';

interface AttachmentsSectionProps {
  onSendWithAttachments: (attachments: Attachment[], message?: string) => void;
  onClose: () => void;
}

const AttachmentsSection: React.FC<AttachmentsSectionProps> = ({ 
  onSendWithAttachments, 
  onClose 
}) => {
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [messageText, setMessageText] = useState('');

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

  const handleFiles = async (files: File[]) => {
    const newAttachments: Attachment[] = await Promise.all(
      files.map(async (file, index) => {
        let preview: string | undefined;
        
        if (file.type.includes('image')) {
          preview = URL.createObjectURL(file);
        }

        return {
          id: Date.now() + index.toString(),
          name: file.name,
          type: file.type,
          size: formatFileSize(file.size),
          preview,
          progress: 0
        };
      })
    );

    setAttachments((prev) => [...prev, ...newAttachments]);

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

  const handleSend = () => {
    if (attachments.length > 0) {
      onSendWithAttachments(attachments, messageText);
      setAttachments([]);
      setMessageText('');
      onClose();
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
          <IconButton
            onClick={deleteAllAttachments}
            size="small"
            sx={{ color: "text.secondary" }}
          >
            <TrashIcon />
          </IconButton>

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

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileInputChange}
            multiple
            style={{ display: "none" }}
          />
        </Box>
      </Box>

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
                  {attachment.size}
                </Typography>
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

      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Add a message (optional)"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          style={{
            flexGrow: 1,
            padding: '8px 12px',
            border: '1px solid #ddd',
            borderRadius: '20px',
            fontSize: '14px',
            outline: 'none'
          }}
        />
        <Button
          variant="contained"
          onClick={handleSend}
          disabled={attachments.length === 0}
          sx={{ 
            minWidth: 'auto', 
            borderRadius: '20px',
            backgroundColor: '#2063FF',
            '&:hover': { backgroundColor: '#1a56db' }
          }}
        >
          <SendIcon />
        </Button>
      </Box>

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