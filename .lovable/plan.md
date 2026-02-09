

# 🎪 EventFlow - Event Management Platform

A premium, production-ready event management application with fluid animations and glassmorphism design.

---

## 📱 Core Experience Overview

### Visual Identity
- **Primary palette**: Rich gradients (purple → blue → teal) with translucent glass cards
- **Glass effects**: Frosted backgrounds with backdrop-blur, soft borders, and subtle shadows
- **Typography**: Clean, modern sans-serif with varying weights for hierarchy
- **Dark mode focus**: Dark backgrounds to make glass elements pop

---

## 🚀 User Journey

### 1. Splash Screen
- Centered animated logo with scale + fade entrance
- Spring overshoot effect before settling
- Auto-navigation to Landing Page after 2 seconds

### 2. Landing Page (Combined Home + About)
- Hero section with gradient background and floating glass cards
- Central "Get Started" button with glow effect
- About section with feature highlights and animated icons
- Smooth scroll behavior between sections
- Smart navigation: Auth check determines destination

### 3. Authentication
- Google Sign-In via Supabase Auth
- Beautiful glass card login form with animated transitions
- First-time users get an automatic profile created
- Animated success state before dashboard redirect

---

## 🎛️ Dashboard & Role System

### Role Switcher (Radial Menu)
- Floating settings icon (top-right)
- Opens a circular radial menu with Organiser/Participant options
- Animations:
  - Center button morphs (☰ → ✕) with pulse
  - Background dims + blurs
  - Menu items appear with staggered radial reveal
  - Spring overshoot + subtle rotation on each item
  - Shadow depth illusion

### Organiser Dashboard
- "My Events" grid with animated event cards
- Quick stats bar (total events, published, drafts)
- Floating "Create Event" button
- Skeleton loaders during data fetch

### Participant Dashboard
- "Browse Events" feed with category filters
- "Saved Events" section for bookmarked items
- Event cards with scroll-triggered animations

---

## 📋 Organiser Features

### Event Management
- **Create Event**: Slide-in panel (not modal) with form fields:
  - Title, Description, Date & Time
  - Venue, Rules
  - Category selection (Tech, Music, Sports, Arts, Business, Other)
  - External Google Form registration link
  - Poster upload (drag-and-drop with preview)
  
- **Edit Event**: Same panel pre-filled with existing data
- **Delete Event**: Confirmation with animated alert
- **Publish Toggle**: Animated switch with state change feedback

### Poster Upload
- Drag-and-drop zone with upload progress indicator
- Image preview with remove option
- Stored in Supabase Storage (event-posters bucket)

---

## 👥 Participant Features

### Event Discovery
- Category filter tabs with animated selection indicator
- Search bar with instant results
- Grid of published event cards with:
  - Poster thumbnail
  - Title, date, venue preview
  - Category badge
  - Bookmark toggle

### Event Detail Page
- Full-screen slide + fade transition
- Large poster image with parallax effect
- Event information with glass card sections
- "Register" button:
  - Bottom-sheet rise animation
  - Opens Google Form in new tab
  
### Bookmarking
- Heart/bookmark icon with pop animation
- "Saved Events" page accessible from dashboard
- Remove bookmark with confirmation

---

## ✨ Animation System

### Reusable Animated Components
- `AnimatedCard` - fade + slide on scroll
- `RadialMenu` - circular menu with staggered reveal
- `GlassPanel` - slide-in side panel
- `PageTransition` - wrapper for route animations
- `AnimatedButton` - hover glow + press feedback
- `SkeletonLoader` - pulsing placeholder
- `BottomSheet` - swipeable bottom panel

### Transition Map
| From | To | Animation |
|------|-----|-----------|
| Splash | Landing | Fade + scale |
| Landing | Auth | Slide left + fade |
| Auth | Dashboard | Scale + blur bg |
| Dashboard | Event Detail | Slide + fade |
| Any | Settings/Profile | Scale + blur |

---

## 🗄️ Database Schema

### Tables
1. **profiles**
   - id, user_id, display_name, avatar_url, created_at

2. **user_roles**
   - id, user_id, role (enum: organiser, participant)
   - Users can have multiple roles

3. **events**
   - id, organiser_id, title, description
   - date, time, venue, rules
   - category, poster_url, registration_link
   - is_published, created_at, updated_at

4. **saved_events** (bookmarks)
   - id, user_id, event_id, saved_at

### Security (RLS)
- Organisers can only CRUD their own events
- Participants can only read published events
- Users can only manage their own bookmarks
- Role checking via security definer function

---

## 📁 Project Structure

```
src/
├── animations/       # Central animation configs
├── components/
│   ├── ui/           # Base UI components
│   ├── animated/     # Reusable animated wrappers
│   ├── layout/       # Page layouts, navigation
│   └── events/       # Event-specific components
├── hooks/            # Custom React hooks
├── pages/            # Route pages
├── lib/              # Supabase client, utilities
└── types/            # TypeScript definitions
```

---

## 🎯 Implementation Phases

**Phase 1: Foundation**
- Supabase setup (auth, database, storage)
- Animation system and glass design tokens
- Splash screen and landing page

**Phase 2: Authentication**
- Google OAuth integration
- Profile creation on first login
- Protected routes

**Phase 3: Dashboard & Roles**
- Role switcher radial menu
- Dashboard layouts for both roles
- Role management logic

**Phase 4: Organiser Flow**
- Event CRUD operations
- Poster upload functionality
- Publish/unpublish toggle

**Phase 5: Participant Flow**
- Event browsing with categories
- Event detail pages
- Registration flow with animations
- Bookmark system

**Phase 6: Polish**
- Page transitions refinement
- Performance optimization
- Mobile responsiveness

---

This plan delivers a visually stunning, production-ready application with intentional, physical-feeling animations throughout. Every interaction will feel premium and polished.

