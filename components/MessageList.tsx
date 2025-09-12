'use client';

import React, { useEffect, useRef } from 'react';
import { Box, Paper, Typography, Avatar } from '@mui/material';
import { Message } from '@/types';

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Box sx={{ p: 2 }}>
      {messages.map((message) => (
        <Box
          key={message.id}
          sx={{
            display: 'flex',
            justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
            mb: 2
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: message.sender === 'user' ? 'row-reverse' : 'row',
              alignItems: 'flex-start',
              maxWidth: '70%'
            }}
          >
            <Avatar
              sx={{
                mx: 1,
                bgcolor: message.sender === 'user' ? 'primary.main' : 'secondary.main'
              }}
            >
              {message.sender === 'user' ? 'U' : 'A'}
            </Avatar>
            <Paper
              elevation={1}
              sx={{
                p: 2,
                bgcolor: message.sender === 'user' ? 'primary.light' : 'background.paper',
                color: message.sender === 'user' ? 'primary.contrastText' : 'text.primary',
              }}
            >
              <Typography variant="body1">{message.text}</Typography>
              <Typography 
                variant="caption" 
                display="block" 
                sx={{ 
                  mt: 1, 
                  textAlign: 'right',
                  opacity: 0.7
                }}
              >
                {message.timestamp.toLocaleTimeString()}
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