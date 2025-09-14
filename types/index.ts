export interface Attachment {
  id: string;
  name: string;
  type: string;
  size: string;
  url?: string;
  preview?: string;
  progress?: number;
}

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  attachments?: Attachment[];
}

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
}