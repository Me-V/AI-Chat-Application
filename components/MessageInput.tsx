'use client';

import React, { useState } from 'react';
import { Box, TextField, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useChat } from '@/contexts/ChatContext';

const MessageInput: React.FC = () => {
  const [message, setMessage] = useState('');
  const { sendMessage } = useChat();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage(message);
      setMessage('');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 1 }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        size="small"
      />
      <IconButton 
        type="submit" 
        color="primary" 
        disabled={!message.trim()}
        sx={{ 
          bgcolor: 'primary.main',
          color: 'white',
          '&:hover': {
            bgcolor: 'primary.dark'
          },
          '&:disabled': {
            bgcolor: 'action.disabled'
          }
        }}
      >
        <SendIcon />
      </IconButton>
    </Box>
  );
};

export default MessageInput;