import { Conversation } from '@/context/ChatContext';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';

interface ConversationItemProps {
  conversation: Conversation;
  isSelected: boolean;
  onSelect: () => void;
}

export function ConversationItem({
  conversation,
  isSelected,
  onSelect,
}: ConversationItemProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatTime = (date: string | undefined) => {
    if (!date) return '';
    try {
      return formatDistanceToNow(new Date(date), { addSuffix: false });
    } catch {
      return '';
    }
  };

  return (
    <button
      onClick={onSelect}
      className={cn(
        'w-full px-3 py-3 flex items-start gap-3 hover:bg-gray-100 transition-colors text-left group',
        isSelected && 'bg-gray-100'
      )}
    >
      {/* Avatar */}
      <div className="flex-shrink-0 relative">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
          <span className="text-white font-semibold text-sm">
            {getInitials(conversation.participantName)}
          </span>
        </div>
        {/* Online indicator */}
        {conversation.isOnline && (
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline justify-between gap-2 mb-1">
          <p className="font-medium text-gray-900 truncate text-sm">
            {conversation.participantName}
          </p>
          {conversation.lastMessageTime && (
            <span className="text-xs text-gray-500 flex-shrink-0">
              {formatTime(conversation.lastMessageTime)}
            </span>
          )}
        </div>

        <p className="text-sm text-gray-600 truncate line-clamp-1">
          {conversation.lastMessage || 'No messages yet'}
        </p>
      </div>

      {/* Unread badge */}
      {conversation.unreadCount && conversation.unreadCount > 0 && (
        <div className="flex-shrink-0">
          <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-[#128C7E] rounded-full">
            {conversation.unreadCount > 99 ? '99+' : conversation.unreadCount}
          </span>
        </div>
      )}
    </button>
  );
}
