'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Message, Chat, Attachment } from '@/types';

interface ChatContextType {
  chats: Chat[];
  currentChat: Chat | null;
  isNewChat: boolean;
  createNewChat: () => void;
  sendMessage: (text: string, attachments?: Attachment[]) => void;
  selectChat: (chatId: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);

  const generateTitleFromMessage = (text: string) => {
    const words = text.trim().split(/\s+/);
    return words.slice(0, 4).join(' ') + (words.length > 4 ? '...' : '');
  };

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

  const sendMessage = async (text: string, attachments: Attachment[] = []) => {
    let targetChat = currentChat;
    
    if (!targetChat) {
      const newChat: Chat = {
        id: Date.now().toString(),
        title: text ? generateTitleFromMessage(text) : 'File shared',
        messages: [],
        createdAt: new Date(),
      };
      setCurrentChat(newChat);
      setChats(prev => [newChat, ...prev]);
      targetChat = newChat;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
      attachments: attachments.length > 0 ? attachments : undefined,
    };

    const updatedChat = {
      ...targetChat,
      messages: [...targetChat.messages, userMessage],
      title: targetChat.messages.length === 0 && text 
        ? generateTitleFromMessage(text) 
        : targetChat.title
    };

    setCurrentChat(updatedChat);
    setChats(prev => prev.map(chat => chat.id === updatedChat.id ? updatedChat : chat));

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