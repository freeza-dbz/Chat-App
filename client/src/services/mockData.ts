import { User } from '@/context/AuthContext';
import { Conversation, Message } from '@/context/ChatContext';

export const mockUsers: Record<string, User> = {
  user1: {
    id: 'user1',
    username: 'john_doe',
    email: 'john@example.com',
    avatar: '👨‍💻',
  },
  user2: {
    id: 'user2',
    username: 'jane_smith',
    email: 'jane@example.com',
    avatar: '👩‍💼',
  },
  user3: {
    id: 'user3',
    username: 'alex_wilson',
    email: 'alex@example.com',
    avatar: '👨‍🎨',
  },
  user4: {
    id: 'user4',
    username: 'sarah_johnson',
    email: 'sarah@example.com',
    avatar: '👩‍🚀',
  },
};

export const mockConversations: Conversation[] = [
  {
    id: 'conv1',
    participantId: 'user2',
    participantName: 'Jane Smith',
    participantAvatar: '👩‍💼',
    lastMessage: 'Hey! How are you doing?',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    unreadCount: 0,
    isOnline: true,
  },
  {
    id: 'conv2',
    participantId: 'user3',
    participantName: 'Alex Wilson',
    participantAvatar: '👨‍🎨',
    lastMessage: 'Let me know when you are free',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    unreadCount: 2,
    isOnline: false,
  },
  {
    id: 'conv3',
    participantId: 'user4',
    participantName: 'Sarah Johnson',
    participantAvatar: '👩‍🚀',
    lastMessage: 'The project looks great!',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    unreadCount: 0,
    isOnline: true,
  },
];

export const mockMessages: Record<string, Message[]> = {
  conv1: [
    {
      id: 'msg1',
      conversationId: 'conv1',
      senderId: 'user1',
      text: 'Hi Jane! How are you?',
      createdAt: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
    },
    {
      id: 'msg2',
      conversationId: 'conv1',
      senderId: 'user2',
      text: 'Hey! I am doing great, thanks for asking',
      createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    },
    {
      id: 'msg3',
      conversationId: 'conv1',
      senderId: 'user1',
      text: 'That is wonderful! Want to grab coffee?',
      createdAt: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
    },
    {
      id: 'msg4',
      conversationId: 'conv1',
      senderId: 'user2',
      text: 'Sure! How about tomorrow at 3 PM?',
      createdAt: new Date(Date.now() - 1000 * 60 * 8).toISOString(),
    },
    {
      id: 'msg5',
      conversationId: 'conv1',
      senderId: 'user1',
      text: 'Perfect! See you then 😊',
      createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    },
    {
      id: 'msg6',
      conversationId: 'conv1',
      senderId: 'user2',
      text: 'Hey! How are you doing?',
      createdAt: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
    },
  ],
  conv2: [
    {
      id: 'msg7',
      conversationId: 'conv2',
      senderId: 'user3',
      text: 'Hey, did you check the designs I sent?',
      createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    },
    {
      id: 'msg8',
      conversationId: 'conv2',
      senderId: 'user1',
      text: 'Yes, they look amazing!',
      createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    },
    {
      id: 'msg9',
      conversationId: 'conv2',
      senderId: 'user3',
      text: 'Let me know when you are free',
      createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    },
  ],
  conv3: [
    {
      id: 'msg10',
      conversationId: 'conv3',
      senderId: 'user1',
      text: 'Hi Sarah! How is the project going?',
      createdAt: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
    },
    {
      id: 'msg11',
      conversationId: 'conv3',
      senderId: 'user4',
      text: 'It is going well! The frontend is almost done',
      createdAt: new Date(Date.now() - 1000 * 60 * 80).toISOString(),
    },
    {
      id: 'msg12',
      conversationId: 'conv3',
      senderId: 'user1',
      text: 'That is great news!',
      createdAt: new Date(Date.now() - 1000 * 60 * 70).toISOString(),
    },
    {
      id: 'msg13',
      conversationId: 'conv3',
      senderId: 'user4',
      text: 'The project looks great!',
      createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    },
  ],
};

export const mockAuthUser: User = {
  id: 'user1',
  username: 'John Doe',
  email: 'john.doe@example.com',
  avatar: '👨‍💻',
};
