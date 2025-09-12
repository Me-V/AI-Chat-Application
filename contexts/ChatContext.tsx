'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Message, Chat } from '@/types';

interface ChatContextType {
  chats: Chat[];
  currentChat: Chat | null;
  isNewChat: boolean;
  createNewChat: () => void;
  sendMessage: (text: string) => void;
  selectChat: (chatId: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);

  const createNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: 'New Chat',
      messages: [],
      createdAt: new Date(),
    };
    setCurrentChat(newChat);
    setChats(prev => [newChat, ...prev]);
  };

  const selectChat = (chatId: string) => {
    const chat = chats.find(chat => chat.id === chatId);
    if (chat) {
      setCurrentChat(chat);
    }
  };

  const sendMessage = async (text: string) => {
    if (!currentChat) {
      createNewChat();
      // Wait for state update before proceeding
      setTimeout(() => sendMessage(text), 100);
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };

    // Update current chat with user message
    const updatedChat = {
      ...currentChat,
      messages: [...currentChat.messages, userMessage],
      title: currentChat.messages.length === 0 ? text.slice(0, 30) + (text.length > 30 ? '...' : '') : currentChat.title
    };

    setCurrentChat(updatedChat);
    setChats(prev => prev.map(chat => chat.id === updatedChat.id ? updatedChat : chat));

    // Simulate assistant response after a delay
    setTimeout(() => {
      const assistantMessage: Message = {
        id: Date.now().toString(),
        text: "Thanks for your message! This is a simulated response from the assistant.",
        sender: 'assistant',
        timestamp: new Date(),
      };

      const finalChat = {
        ...updatedChat,
        messages: [...updatedChat.messages, assistantMessage],
      };

      setCurrentChat(finalChat);
      setChats(prev => prev.map(chat => chat.id === finalChat.id ? finalChat : chat));
    }, 1000);
  };

  return (
    <ChatContext.Provider value={{
      chats,
      currentChat,
      isNewChat: currentChat?.messages.length === 0,
      createNewChat,
      sendMessage,
      selectChat,
    }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};