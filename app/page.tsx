'use client';

import React from 'react';
import { Box } from '@mui/material';
import { ChatProvider } from '@/contexts/ChatContext';
import Sidebar from '@/components/Sidebar';
import ChatContainer from '@/components/ChatContainer';

export default function Home() {
  return (
    <ChatProvider>
      <Box sx={{ display: 'flex', height: '100vh', width: '100%' }}>
        <Sidebar />
        <Box 
          component="main" 
          sx={{ 
            flexGrow: 1,
            height: '100%',
            overflow: 'auto',
          }}
        >
          <ChatContainer />
        </Box>
      </Box>
    </ChatProvider>
  );
}