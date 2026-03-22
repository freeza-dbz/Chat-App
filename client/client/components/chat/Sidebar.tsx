import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useChat } from '@/context/ChatContext';
import { useAuth } from '@/context/AuthContext';
import { conversationsAPI } from '@/services/api';
import { mockConversations } from '@/services/mockData';
import { ConversationItem } from './ConversationItem';
import { Search, LogOut, Menu, X, Loader2 } from 'lucide-react';

interface SidebarProps {
  onLogout: () => void;
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

export function Sidebar({ onLogout, isMobileOpen = false, onMobileClose }: SidebarProps) {
  const { conversations, selectedConversation, selectConversation, setConversations } = useChat();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        setIsLoading(true);
        try {
          const response = await conversationsAPI.getConversations();
          setConversations(response.data);
        } catch (backendError) {
          console.log('Using demo mode with mock conversations');
          setConversations(mockConversations);
        }
      } catch (error) {
        console.error('Failed to fetch conversations:', error);
        setConversations(mockConversations);
      } finally {
        setIsLoading(false);
      }
    };

    fetchConversations();
  }, [setConversations]);

  const filteredConversations = conversations.filter((conv) =>
    conv.participantName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sidebarContent = (
    <>
      {/* Header */}
      <div className="p-4 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">ChatFlow</h1>
          </div>
          {isMobileOpen && (
            <button onClick={onMobileClose} className="md:hidden p-1 hover:bg-gray-100 rounded">
              <X className="w-5 h-5 text-gray-600" />
            </button>
          )}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-9 bg-[#f0f2f5] border-0 focus:bg-white text-sm placeholder:text-gray-500"
          />
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto bg-white">
        {isLoading ? (
          <div className="flex items-center justify-center h-40">
            <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
          </div>
        ) : filteredConversations.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {filteredConversations.map((conversation) => (
              <ConversationItem
                key={conversation.id}
                conversation={conversation}
                isSelected={selectedConversation?.id === conversation.id}
                onSelect={() => {
                  selectConversation(conversation);
                  onMobileClose?.();
                }}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-40 text-gray-500">
            <p className="text-sm">
              {searchQuery ? 'No conversations found' : 'No conversations yet'}
            </p>
          </div>
        )}
      </div>

      {/* Footer with User Info */}
      <div className="bg-white border-t border-gray-200 p-4 space-y-3">
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-full bg-[#128C7E] flex items-center justify-center flex-shrink-0">
            <span className="text-white font-semibold text-sm">
              {user?.username?.[0]?.toUpperCase() || 'U'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{user?.username}</p>
            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
          </div>
        </div>

        <Button
          onClick={onLogout}
          variant="outline"
          className="w-full h-9 border-gray-300 text-gray-700 hover:bg-red-50 hover:text-red-700 hover:border-red-300 text-sm"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </>
  );

  // Mobile drawer
  if (isMobileOpen) {
    return (
      <>
        <div
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
          onClick={onMobileClose}
        />
        <div className="fixed left-0 top-0 bottom-0 w-64 bg-white z-40 md:hidden flex flex-col shadow-lg">
          {sidebarContent}
        </div>
      </>
    );
  }

  // Desktop sidebar
  return (
    <div className="hidden md:flex flex-col h-full w-72 bg-white border-r border-gray-200">
      {sidebarContent}
    </div>
  );
}
