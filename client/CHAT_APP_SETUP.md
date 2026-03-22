# ChatFlow - Real-Time Chat Application

A production-ready React frontend for a real-time chat application built with MERN + Socket.IO stack.

## Project Structure

```
client/
├── components/
│   ├── chat/
│   │   ├── Sidebar.tsx          # Conversations list with search
│   │   ├── ConversationItem.tsx  # Individual conversation item
│   │   ├── ChatBox.tsx           # Main chat interface
│   │   ├── Message.tsx           # Individual message bubble
│   │   ├── MessageInput.tsx      # Message input & send
│   │   └── index.ts              # Component exports
│   └── ui/                       # Radix UI components
├── context/
│   ├── AuthContext.tsx           # User authentication state
│   └── ChatContext.tsx           # Chat messages & conversations state
├── pages/
│   ├── Index.tsx                 # Auth redirect page
│   ├── Login.tsx                 # Login page
│   ├── Register.tsx              # Register/signup page
│   ├── Chat.tsx                  # Main chat layout
│   └── NotFound.tsx              # 404 page
├── services/
│   ├── api.ts                    # Axios instance + API endpoints
│   └── socket.ts                 # Socket.IO client setup
├── global.css                    # Tailwind + custom styles
└── App.tsx                       # Routes & providers
```

## Features Implemented

### Authentication
- ✅ Login page with form validation
- ✅ Register/signup page with password confirmation
- ✅ Auth context for state management
- ✅ Token-based authentication with localStorage
- ✅ Protected routes (redirects to login if not authenticated)

### Chat Interface
- ✅ Responsive sidebar with conversation list
- ✅ Search conversations by username
- ✅ Online/offline indicators for users
- ✅ Message bubbles (sent on right, received on left)
- ✅ Message timestamps (click to see full date/time)
- ✅ Auto-scroll to latest message
- ✅ Scrollable message history

### Real-Time Features
- ✅ Socket.IO client integration
- ✅ Real-time message receiving
- ✅ Message sent events
- ✅ Online users tracking
- ✅ Typing indicators support (ready for implementation)

### UI/UX
- ✅ Modern gradient color scheme (Blue/Purple)
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Loading spinners
- ✅ Error handling & validation
- ✅ Empty states
- ✅ Smooth animations & transitions
- ✅ Dark mode ready (CSS variables configured)

### Mobile
- ✅ Mobile-optimized sidebar (collapsible)
- ✅ Touch-friendly buttons
- ✅ Responsive typography
- ✅ Back navigation in mobile chat view

## Backend Integration

### Required Backend Endpoints

```javascript
// Authentication
POST /api/auth/register
  Body: { email, password, username }
  Response: { user: { id, username, email }, token }

POST /api/auth/login
  Body: { email, password }
  Response: { user: { id, username, email }, token }

// Users
GET /api/users
  Response: [{ id, username, email, avatar? }]

GET /api/users/:userId
  Response: { id, username, email, avatar? }

// Conversations
GET /api/conversations
  Response: [{
    id,
    participantId,
    participantName,
    participantAvatar?,
    lastMessage?,
    lastMessageTime?,
    unreadCount?,
    isOnline?
  }]

POST /api/conversations
  Body: { userId }
  Response: { id, participantId, ... }

// Messages
GET /api/messages/:conversationId
  Response: [{
    id,
    conversationId,
    senderId,
    text,
    createdAt
  }]

POST /api/messages
  Body: { conversationId, text }
  Response: { id, conversationId, senderId, text, createdAt }
```

### Socket.IO Events

#### Client → Server
```javascript
// Send message
socket.emit('sendMessage', {
  conversationId: string,
  text: string,
  senderId: string
})

// Typing indicator
socket.emit('typing', {
  conversationId: string,
  userId: string
})
```

#### Server → Client
```javascript
// Receive message
socket.on('getMessage', (data) => {
  // { id, conversationId, senderId, text, createdAt }
})

// Online users
socket.on('onlineUsers', (userIds) => {
  // Array of online user IDs
})

// User status changed
socket.on('userStatusChanged', (data) => {
  // { userId, isOnline }
})

// Typing indicator
socket.on('typing', (data) => {
  // { conversationId, userId }
})
```

## Configuration

### API Base URL
Default: `http://localhost:5000`

Update in `client/services/api.ts`:
```typescript
const API_BASE_URL = 'http://localhost:5000';
```

### Socket.IO URL
Default: `http://localhost:5000`

Update in `client/services/socket.ts`:
```typescript
const SOCKET_URL = 'http://localhost:5000';
```

## Authentication Flow

1. User visits `/` → redirected to `/login` (if not authenticated)
2. User enters credentials → POST `/api/auth/login`
3. Backend returns `{ user, token }`
4. Token stored in `localStorage` and Auth context
5. User redirected to `/chat`
6. Auth header automatically added to all API requests
7. Socket.IO connects and listens for real-time events

## Development

### Install Dependencies
```bash
pnpm install
```

### Start Dev Server
```bash
pnpm dev
```

Server runs on `http://localhost:8080`

### Build for Production
```bash
pnpm build
```

### Run Tests
```bash
pnpm test
```

## Styling

### Color Palette
- **Primary**: Blue (#2563eb)
- **Secondary**: Purple (#a855f7)
- **Background**: White with light gray accents
- **Text**: Dark gray (#1f2937)

### Customization
Edit `client/global.css` to modify:
- CSS variables (HSL format)
- Light/dark mode colors
- Custom animations
- Scrollbar styling

Edit `tailwind.config.ts` to add:
- New colors
- Border radius
- Font families
- Custom utilities

## Component Usage

### Chat Provider
Wrap Chat page with `ChatProvider` to access chat context:
```typescript
import { ChatProvider, useChat } from '@/context/ChatContext';

<ChatProvider>
  <ChatContent />
</ChatProvider>

// In any component:
const { conversations, messages, selectedConversation } = useChat();
```

### Auth Context
Access user info anywhere:
```typescript
import { useAuth } from '@/context/AuthContext';

const { user, token, login, logout } = useAuth();
```

### Socket Service
Singleton socket service for real-time updates:
```typescript
import socketService from '@/services/socket';

socketService.connect();
socketService.sendMessage(conversationId, { text, senderId });
socketService.onMessage((data) => {
  // Handle incoming message
});
```

### API Calls
Type-safe API wrapper with Axios:
```typescript
import { authAPI, messagesAPI, conversationsAPI } from '@/services/api';

const { data } = await authAPI.login(email, password);
const messages = await messagesAPI.getMessages(conversationId);
```

## Performance Optimization

- ✅ Code splitting with React Router
- ✅ Lazy loading for chat components
- ✅ Message virtualization ready (for large message histories)
- ✅ Socket.IO connection pooling
- ✅ Optimized re-renders with Context API

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Next Steps

1. **Setup Backend** - Create MERN API server with Socket.IO
2. **Environment Variables** - Add backend URL to `.env`
3. **Testing** - Implement unit & integration tests
4. **State Management** - Consider Redux/Zustand for complex state
5. **Features** - Add typing indicators, read receipts, file uploads
6. **Notifications** - Browser notifications for new messages
7. **Accessibility** - Add ARIA labels and keyboard navigation

## License

MIT
