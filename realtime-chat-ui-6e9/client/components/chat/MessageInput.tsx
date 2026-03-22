import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Loader2, Smile, Plus } from 'lucide-react';

interface MessageInputProps {
  onSendMessage: (text: string) => Promise<void>;
  disabled?: boolean;
  placeholder?: string;
}

export function MessageInput({
  onSendMessage,
  disabled = false,
  placeholder = 'Type a message...',
}: MessageInputProps) {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isLoading || disabled) return;

    setIsLoading(true);
    try {
      await onSendMessage(message.trim());
      setMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-gray-200">
      <div className="flex items-end gap-2">
        {/* Emoji button */}
        <button
          type="button"
          className="p-2 hover:bg-gray-100 rounded-full transition"
        >
          <Smile className="w-5 h-5 text-gray-600" />
        </button>

        {/* Input */}
        <Input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          disabled={disabled || isLoading}
          className="flex-1 h-10 bg-gray-100 border-0 focus:bg-white rounded-full px-4 text-sm placeholder:text-gray-500"
        />

        {/* Attachment button */}
        <button
          type="button"
          className="p-2 hover:bg-gray-100 rounded-full transition"
        >
          <Plus className="w-5 h-5 text-gray-600" />
        </button>

        {/* Send button */}
        <Button
          type="submit"
          disabled={disabled || isLoading || !message.trim()}
          className="h-10 w-10 p-0 rounded-full bg-[#25D366] hover:bg-[#1fa855] flex items-center justify-center"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Send className="w-5 h-5" />
          )}
        </Button>
      </div>
    </form>
  );
}
