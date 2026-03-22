# ChatFlow Design System

A clean, minimal WhatsApp-inspired chat application design system built with Tailwind CSS and custom CSS variables.

## Color Palette

### Light Theme (Default)

#### Primary Colors
- **WhatsApp Green**: `#25D366` - Primary action color, buttons, online indicator
- **Dark Green**: `#1fa855` - Hover state for green buttons
- **Light Green**: `#DCF8C6` - Sent message background

#### Neutral Colors
- **Background**: `#F0F2F5` - Main chat area background
- **Sidebar**: `#FFFFFF` - Sidebar and cards background
- **Chat Message (Sent)**: `#DCF8C6` - User sent messages
- **Chat Message (Received)**: `#FFFFFF` - Received messages
- **Border**: `#E5DDD5` - Light borders and dividers

#### Text Colors
- **Primary Text**: `#111B21` - Main heading and bold text
- **Secondary Text**: `#667781` - Regular message text
- **Light Text**: `#8696A0` - Timestamps, helper text

#### Status Indicators
- **Online**: `#25D366` - Green dot for online users
- **Offline**: `#A0A0A0` - Gray dot for offline users

### Dark Theme

#### Primary Colors
- **WhatsApp Green**: `#25D366` - Same as light theme
- **Sent Message**: `#005C4B` - Dark green for sent messages

#### Neutral Colors
- **Background**: `#0B141A` - Main dark background
- **Sidebar**: `#202C33` - Dark sidebar background
- **Chat Background**: `#111B21` - Dark chat area
- **Received Message**: `#202C33` - Dark received message background

#### Text Colors
- **Primary Text**: `#E9EDEF` - White/light text
- **Secondary Text**: `#8696A0` - Secondary text
- **Light Text**: `#667781` - Dimmed text

## CSS Variables

All colors are defined as CSS custom properties (HSL format) for easy theming:

```css
/* Light Theme */
:root {
  --whatsapp-green: 150 86% 39%;
  --whatsapp-light-green: 120 60% 85%;
  --chat-bg: 210 14% 97%;
  --message-bg-sent: 120 60% 85%;
  --message-bg-received: 0 0% 100%;
  --text-primary: 217 14% 13%;
  --text-secondary: 210 8% 40%;
  --text-light: 210 8% 62%;
}

/* Dark Theme */
.dark {
  --whatsapp-green: 150 86% 39%;
  --chat-bg: 215 13% 11%;
  --message-bg-sent: 150 50% 30%;
  --message-bg-received: 217 14% 20%;
  --text-primary: 210 8% 93%;
  --text-secondary: 210 8% 70%;
  --text-light: 210 8% 55%;
}
```

## Component Styles

### Message Bubbles

**Sent Message**
```tailwind
.message-sent
  bg-[#DCF8C6] text-[#111B21] rounded-3xl rounded-br-none px-4 py-2
```

**Received Message**
```tailwind
.message-received
  bg-white text-[#111B21] rounded-3xl rounded-bl-none px-4 py-2 shadow-sm
```

**Dark Mode Overrides**
- Sent: `bg-[#005C4B] text-white`
- Received: `bg-[#202C33] text-[#E9EDEF]`

### Sidebar Items

```tailwind
.sidebar-item
  px-4 py-3 hover:bg-gray-100 transition-colors duration-150

/* Dark mode */
.dark .sidebar-item
  hover:bg-[#2A3F47]
```

### Input Fields

```tailwind
.input-field
  rounded-full bg-gray-100 border-0 px-4 py-2.5 text-sm
  placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-[#25D366]/20
```

### Chat Headers

```tailwind
.chat-header
  bg-white border-b border-gray-200 shadow-sm

/* Dark mode */
.dark .chat-header
  bg-[#202C33] border-gray-700
```

## Typography

### Font Family
- **Default**: System fonts (Inter via Google Fonts)
- **Weight Distribution**:
  - Bold (700): Usernames, headings
  - Semibold (600): Section titles
  - Medium (500): Button text
  - Regular (400): Message content

### Text Sizes
- **Heading 1**: `text-2xl font-bold`
- **Heading 2**: `text-xl font-semibold`
- **Body**: `text-sm`
- **Small**: `text-xs`
- **Timestamp**: `text-xs text-gray-500`

## Spacing System

### Padding
- **xs**: `p-1` (4px)
- **sm**: `p-2` (8px)
- **md**: `p-3` (12px)
- **lg**: `p-4` (16px)

### Gaps Between Elements
- **Messages**: `space-y-2`
- **Sidebar items**: `space-y-0` (use borders instead)
- **Form fields**: `space-y-3`

### Sidebar Item Spacing
- **Padding**: `px-4 py-3`
- **Avatar size**: `w-12 h-12`
- **Gap to text**: `gap-3`

## Border Radius

- **Messages**: `rounded-3xl` (large rounded corners)
- **Message cutout**: `rounded-br-none` or `rounded-bl-none`
- **Inputs**: `rounded-full` (completely rounded)
- **Buttons**: `rounded-full` (send button) or `rounded-lg` (regular buttons)
- **Cards**: `rounded-lg`

## Shadows

### Subtle Shadows Only
- **Message received**: `shadow-sm` (light shadow)
- **Header**: `shadow-sm`
- **Chat info panel**: No shadow (clean look)
- **Sidebar**: No shadow

## Status Indicators

### Online/Offline Dots
```tailwind
.online-indicator
  w-3 h-3 bg-[#25D366] rounded-full border-2 border-white

.offline-indicator
  w-3 h-3 bg-[#A0A0A0] rounded-full border-2 border-white
```

## Buttons

### Primary Button (Send)
```tailwind
bg-[#25D366] hover:bg-[#1fa855] text-white rounded-full transition-colors
```

### Secondary Button
```tailwind
border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg
```

### Ghost Button
```tailwind
hover:bg-gray-100 dark:hover:bg-[#2A3F47] transition-colors
```

## Layout System

### Chat Container Structure
```
┌─────────────────────────────────────┐
│         Chat Header (Fixed)         │ h-14 bg-white
├──────────┬──────────────────────────┤
│          │                          │
│ Sidebar  │   Messages Container     │
│ w-72     │   (Flex-1, scroll)       │
│          │                          │
├──────────┼──────────────────────────┤
│          │ Message Input (Fixed)    │ h-20
└──────────┴──────────────────────────┘
```

### Responsive Behavior
- **Desktop (md+)**: Sidebar always visible, width `w-72`
- **Mobile**: Sidebar hidden, toggleable via hamburger menu
- **Chat area**: Takes remaining space with flex-1

## Transitions & Animations

### Hover Effects
```tailwind
hover:bg-gray-100 transition-colors duration-150
```

### Loading Spinner
```tailwind
animate-spin border-4 border-gray-300 border-t-[#25D366]
```

### Smooth Transitions
```css
transition-all duration-200 ease-out
```

## Dark Mode Implementation

### Using Tailwind Dark Mode
All dark mode variants use the `.dark` class on parent:
```tailwind
.dark .message-sent { @apply bg-[#005C4B] text-white; }
.dark .chat-header { @apply bg-[#202C33] border-gray-700; }
```

### Toggle Dark Mode
Add to `<html>` element:
```html
<html class="dark">
```

## Reusable Component Classes

### Messages
- `.message-sent` - Green sent message bubble
- `.message-received` - White received message bubble
- `.chat-bubble` - Wrapper with max-width
- `.chat-timestamp` - Timestamp styling

### Sidebar
- `.sidebar-container` - Main sidebar
- `.sidebar-item` - Conversation list item
- `.sidebar-divider` - Line between items

### Inputs
- `.input-field` - Rounded text input
- `.chat-timestamp` - Time text styling

### Text
- `.text-primary` - Main text color
- `.text-secondary` - Secondary text color
- `.text-light` - Dimmed text color

### Layout
- `.chat-container` - Main chat wrapper
- `.messages-list` - Messages scroll container
- `.chat-header` - Header bar

## Usage Examples

### Creating a New Component
```tsx
// Use existing classes
<div className="message-sent">
  Hello! This is a message.
  <p className="chat-timestamp">14:30</p>
</div>

// Dark mode support automatic
<div className="bg-white dark:bg-slate-900">
  Content
</div>

// With custom colors
<div className="bg-whatsapp-green text-white">
  Send Button
</div>
```

### Tailwind Color Utilities
```tsx
// Using Tailwind color names
bg-whatsapp-green       // #25D366
bg-whatsapp-light-green // #DCF8C6
text-whatsapp-text-primary  // #111B21

// Using HSL vars
bg-[hsl(var(--primary))]
text-[hsl(var(--text-primary))]
```

## Best Practices

1. **Use Existing Classes**: Always use predefined component classes over inline styles
2. **Consistent Spacing**: Use the spacing system (p-2, p-3, p-4) consistently
3. **Color Consistency**: Use only defined colors from palette
4. **Accessibility**: Maintain text contrast ratios:
   - Primary text on white: 7:1 (AAA)
   - Secondary text: 4.5:1 (AA)
5. **Dark Mode**: Test all components in both light and dark modes
6. **Responsive**: Test on mobile, tablet, and desktop sizes

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Supports CSS custom properties
- Tailwind CSS 3.x features

## Future Enhancements

- [ ] Add animated transitions for message arrivals
- [ ] Implement skeleton loaders during data fetch
- [ ] Add typing indicators styling
- [ ] Create read receipts styling
- [ ] Add emoji picker theme colors
