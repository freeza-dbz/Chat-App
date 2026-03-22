import { Conversation } from '@/context/ChatContext';
import { X, Phone, Video, Search, Clock, Bell } from 'lucide-react';
import { format } from 'date-fns';

interface ChatInfoProps {
  conversation: Conversation | null;
  onClose: () => void;
}

export function ChatInfo({ conversation, onClose }: ChatInfoProps) {
  if (!conversation) return null;

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 z-40"
        onClick={onClose}
      />

      {/* Info Panel */}
      <div className="fixed right-0 top-0 bottom-0 w-full sm:w-96 bg-white z-50 flex flex-col shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Contact Info</h3>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-gray-100 rounded-full transition"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          {/* User Card */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-xl">
                  {getInitials(conversation.participantName)}
                </span>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {conversation.participantName}
                </h2>
                <p className="text-sm text-gray-600">
                  {conversation.isOnline ? (
                    <span className="text-green-600 font-medium">Active now</span>
                  ) : (
                    'Offline'
                  )}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 p-2.5 bg-[#f0f2f5] hover:bg-gray-200 rounded-lg transition">
                <Phone className="w-5 h-5 text-[#128C7E]" />
                <span className="text-sm font-medium text-gray-700">Call</span>
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 p-2.5 bg-[#f0f2f5] hover:bg-gray-200 rounded-lg transition">
                <Video className="w-5 h-5 text-[#128C7E]" />
                <span className="text-sm font-medium text-gray-700">Video</span>
              </button>
            </div>
          </div>

          {/* About Section */}
          <div className="p-4 border-b border-gray-200">
            <h4 className="text-xs font-semibold text-gray-500 uppercase mb-3 tracking-wider">
              About
            </h4>
            <p className="text-sm text-gray-700">
              Hey there! I am using ChatFlow.
            </p>
          </div>

          {/* Media Section */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Media, Links and Docs
              </h4>
              <button className="text-[#128C7E] text-sm font-medium hover:underline">
                View all
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center text-gray-400"
                >
                  <span className="text-xs">No media</span>
                </div>
              ))}
            </div>
          </div>

          {/* Settings Section */}
          <div className="p-4 border-b border-gray-200 space-y-3">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Settings
            </h4>

            {/* Mute notifications */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-700">Mute notifications</span>
              </div>
              <input type="checkbox" className="w-4 h-4 accent-[#128C7E]" />
            </div>

            {/* Custom notifications */}
            <button className="w-full text-left text-sm text-[#128C7E] font-medium hover:bg-gray-50 p-2 rounded transition">
              Custom notifications
            </button>
          </div>

          {/* Block User Section */}
          <div className="p-4">
            <button className="w-full px-4 py-2.5 bg-red-50 text-red-600 font-medium rounded-lg hover:bg-red-100 transition text-sm">
              Block Contact
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 text-center text-xs text-gray-500">
          <p>Conversation started recently</p>
        </div>
      </div>
    </>
  );
}
