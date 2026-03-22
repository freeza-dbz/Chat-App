import { Message as MessageType } from '@/context/ChatContext';
import { format } from 'date-fns';
import { useState } from 'react';

interface MessageProps {
  message: MessageType;
  isSent: boolean;
  currentUserId: string;
}

export function Message({ message, isSent, currentUserId }: MessageProps) {
  const [showTime, setShowTime] = useState(false);

  const formatTime = (date: string) => {
    try {
      return format(new Date(date), 'HH:mm');
    } catch {
      return '';
    }
  };

  return (
    <div
      className={`flex ${isSent ? 'justify-end' : 'justify-start'} mb-2 group`}
      onClick={() => setShowTime(!showTime)}
    >
      <div
        className={`chat-bubble ${
          isSent
            ? 'message-sent'
            : 'message-received'
        }`}
      >
        <p className="text-sm break-words leading-snug">{message.text}</p>
        <p className="chat-timestamp mt-0.5">
          {formatTime(message.createdAt)}
        </p>
      </div>
    </div>
  );
}
