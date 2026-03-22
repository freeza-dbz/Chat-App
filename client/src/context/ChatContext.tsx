import { createContext, useContext, useState, ReactNode } from 'react';

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  text: string;
  createdAt: string;
}

export interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar?: string;
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount?: number;
  isOnline?: boolean;
}

interface ChatContextType {
  conversations: Conversation[];
  messages: Message[];
  selectedConversation: Conversation | null;
  onlineUsers: string[];
  
  setConversations: (conversations: Conversation[]) => void;
  setMessages: (messages: Message[]) => void;
  selectConversation: (conversation: Conversation) => void;
  addMessage: (message: Message) => void;
  setOnlineUsers: (users: string[]) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  const selectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
  };

  const addMessage = (message: Message) => {
    setMessages((prev) => [...prev, message]);
  };

  return (
    <ChatContext.Provider
      value={{
        conversations,
        messages,
        selectedConversation,
        onlineUsers,
        setConversations,
        setMessages,
        selectConversation,
        addMessage,
        setOnlineUsers,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within ChatProvider');
  }
  return context;
};
