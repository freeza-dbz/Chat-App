import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { ChatProvider } from '@/context/ChatContext';
import { Sidebar } from '@/components/chat/Sidebar';
import { ChatBox } from '@/components/chat/ChatBox';
import socketService from '@/services/socket';
import { Menu } from 'lucide-react';

function ChatContent() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    socketService.connect();
    return () => {
      // Cleanup listeners
    };
  }, []);

  const handleLogout = () => {
    logout();
    socketService.disconnect();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-[#f0f2f5] overflow-hidden">
      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-14 bg-white border-b border-gray-200 flex items-center px-4 z-20 shadow-sm">
        <button
          onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          className="p-2 hover:bg-gray-100 rounded transition"
        >
          <Menu className="w-5 h-5 text-gray-700" />
        </button>
        <span className="ml-3 font-semibold text-gray-900">ChatFlow</span>
      </div>

      {/* Sidebar */}
      <Sidebar
        onLogout={handleLogout}
        isMobileOpen={isMobileSidebarOpen}
        onMobileClose={() => setIsMobileSidebarOpen(false)}
      />

      {/* Mobile spacer */}
      <div className="md:hidden h-14" />

      {/* Chat Box */}
      <ChatBox onMobileBackClick={() => setIsMobileSidebarOpen(true)} />
    </div>
  );
}

export default function Chat() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#f0f2f5]">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full border-4 border-gray-300 border-t-[#25D366] animate-spin" />
          <p className="mt-4 text-gray-600 text-sm">Loading ChatFlow...</p>
        </div>
      </div>
    );
  }

  return (
    <ChatProvider>
      <ChatContent />
    </ChatProvider>
  );
}
