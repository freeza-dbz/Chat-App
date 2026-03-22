import { useEffect, useRef, useState } from 'react';
import { useChat } from '@/context/ChatContext';
import { useAuth } from '@/context/AuthContext';
import { messagesAPI } from '@/services/api';
import socketService from '@/services/socket';
import { mockMessages } from '@/services/mockData';
import { Message } from './Message';
import { MessageInput } from './MessageInput';
import { ChatInfo } from './ChatInfo';
import { Loader2, ArrowLeft, Info } from 'lucide-react';

interface ChatBoxProps {
  onMobileBackClick?: () => void;
}

export function ChatBox({ onMobileBackClick }: ChatBoxProps) {
  const { selectedConversation, messages, setMessages, addMessage } = useChat();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showChatInfo, setShowChatInfo] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch messages when conversation changes
  useEffect(() => {
    if (!selectedConversation) return;

    const fetchMessages = async () => {
      try {
        setIsLoading(true);
        try {
          const response = await messagesAPI.getMessages(selectedConversation.id);
          setMessages(response.data);
        } catch (backendError) {
          console.log('Using demo mode with mock messages');
          const demoMessages = mockMessages[selectedConversation.id] || [];
          setMessages(demoMessages);
        }
      } catch (error) {
        console.error('Failed to fetch messages:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();
  }, [selectedConversation, setMessages]);

  // Listen for incoming messages
  useEffect(() => {
    const handleNewMessage = (data: any) => {
      if (data.conversationId === selectedConversation?.id) {
        addMessage(data);
      }
    };

    if (selectedConversation) {
      socketService.onMessage(handleNewMessage);
    }

    return () => {
      socketService.offMessage(handleNewMessage);
    };
  }, [selectedConversation, addMessage]);

  // Auto scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    if (!selectedConversation || !user) return;

    try {
      const newMessage = {
        id: 'msg-' + Date.now(),
        conversationId: selectedConversation.id,
        senderId: user.id,
        text,
        createdAt: new Date().toISOString(),
      };

      try {
        await messagesAPI.sendMessage(selectedConversation.id, text);
        socketService.sendMessage(selectedConversation.id, {
          text,
          senderId: user.id,
        });
      } catch (backendError) {
        console.log('Demo mode: Message added locally');
        addMessage(newMessage);
      }
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  if (!selectedConversation) {
    return (
      <div className="hidden md:flex flex-col flex-1 items-center justify-center bg-[#f0f2f5]">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Select a chat</h3>
          <p className="text-sm text-gray-600">Choose a conversation to start messaging</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 bg-[#f0f2f5]">
      {/* Header */}
      <div className="px-4 py-3 bg-white border-b border-gray-200 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <button
            onClick={onMobileBackClick}
            className="md:hidden p-1.5 hover:bg-gray-100 rounded transition"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>

          <button
            onClick={() => setShowChatInfo(true)}
            className="flex-1 min-w-0 text-left hover:opacity-75 transition"
          >
            <div className="flex items-center gap-2">
              <div>
                <h2 className="font-semibold text-gray-900 text-sm truncate">
                  {selectedConversation.participantName}
                </h2>
                <p className="text-xs text-gray-600">
                  {selectedConversation.isOnline ? (
                    <span className="text-green-600">Active now</span>
                  ) : (
                    'Offline'
                  )}
                </p>
              </div>
            </div>
          </button>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-1">
          <button className="p-1.5 hover:bg-gray-100 rounded transition">
            <svg
              className="w-5 h-5 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 00.948-.684l1.498-4.493a1 1 0 011.502-.684l1.498 4.493a1 1 0 00.948.684H19a2 2 0 012 2v1M3 5v13a2 2 0 002 2h14a2 2 0 002-2V5m-5 5a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </button>
          <button
            onClick={() => setShowChatInfo(true)}
            className="p-1.5 hover:bg-gray-100 rounded transition"
          >
            <Info className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
          </div>
        ) : messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            <p className="text-sm">No messages yet. Start the conversation!</p>
          </div>
        ) : (
          messages.map((message) => (
            <Message
              key={message.id}
              message={message}
              isSent={message.senderId === user?.id}
              currentUserId={user?.id || ''}
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <MessageInput
        onSendMessage={handleSendMessage}
        disabled={!selectedConversation}
        placeholder="Type a message..."
      />

      {/* Chat Info Panel */}
      <ChatInfo
        conversation={showChatInfo ? selectedConversation : null}
        onClose={() => setShowChatInfo(false)}
      />
    </div>
  );
}
