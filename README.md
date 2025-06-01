# LocalEvently 🎯

A hyperlocal event discovery and hosting platform built with modern web technologies. Connect with your community through free local events, meetups, and gatherings.

## 🚀 Features

### ✅ Implemented
- **Modern UI**: Clean, responsive design with Tailwind CSS
- **Navigation**: Mobile-friendly navbar with dark mode support
- **Project Structure**: Organized codebase with TypeScript
- **Database Models**: MongoDB schemas for Users and Events
- **Authentication API**: Registration and login endpoints
- **Events API**: CRUD operations for events with filtering
- **Geolocation Ready**: Database indexes for location-based queries
- **Event Listing Page**: Beautiful grid layout with search and filtering
- **Event Detail Page**: Comprehensive event information display
- **Event Creation Form**: User-friendly form for hosting events
- **Mock Data System**: Working demo with sample events
- **Responsive Components**: EventCard, EventFilters, Pagination
- **Advanced Filtering**: Search, tags, date range, location-based
- **Interactive Features**: RSVP buttons, sharing, favorites

### 🔄 In Progress
- User authentication UI (login/register forms)
- Map integration with Leaflet
- Real-time RSVP updates
- Database connection setup

### 📋 Planned
- Advanced filtering and search
- Email notifications
- Admin panel
- PWA support
- Performance optimizations

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Node.js
- **Database**: MongoDB Atlas (free tier)
- **Authentication**: JWT + NextAuth.js
- **Maps**: Leaflet + OpenStreetMap
- **Icons**: Lucide React
- **Animations**: Framer Motion (planned)
- **Deployment**: Vercel (planned)

## 🏗️ Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── auth/          # Authentication endpoints
│   │   └── events/        # Event CRUD endpoints & mock data
│   ├── events/
│   │   ├── [id]/          # Dynamic event detail pages
│   │   ├── create/        # Event creation form
│   │   └── page.tsx       # Events listing page
│   ├── auth/              # Auth pages (planned)
│   ├── layout.tsx         # Root layout with navbar
│   └── page.tsx           # Landing page
├── components/
│   ├── Navbar.tsx         # Navigation component
│   ├── EventCard.tsx      # Event display card
│   ├── EventFilters.tsx   # Search and filtering
│   └── Pagination.tsx     # Pagination component
├── lib/
│   └── mongodb.ts         # Database connection
├── models/
│   ├── User.ts            # User schema
│   └── Event.ts           # Event schema
└── types/
    ├── index.ts           # TypeScript interfaces
    └── global.d.ts        # Global type declarations
```

## 🚦 Getting Started

1. **Clone and install dependencies**:
   ```bash
   cd localevently
   npm install
   ```

2. **Set up environment variables**:
   Copy `.env.local` and update with your MongoDB Atlas connection string:
   ```env
   MONGODB_URI=mongodb+srv://your-username:your-password@cluster0.xxxxx.mongodb.net/localevently
   NEXTAUTH_SECRET=your-super-secret-key-here
   JWT_SECRET=your-jwt-secret-key-here
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open [http://localhost:3000](http://localhost:3000)** in your browser

## 🎯 Next Steps

1. **Set up MongoDB Atlas** (free tier)
2. **Create event listing page** with filtering
3. **Build event creation form**
4. **Add user authentication UI**
5. **Integrate map functionality**
6. **Deploy to Vercel**

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Events
- `GET /api/events` - List events with filtering
- `POST /api/events` - Create new event (auth required)

## 🌟 Why LocalEvently?

- **Real-world relevance**: Solves actual community problems
- **Modern tech stack**: Uses technologies employers want to see
- **Scalable architecture**: Built for growth from day one
- **100% free to build**: Uses only free-tier services
- **Portfolio ready**: Professional-grade code and design

---

Built with ❤️ for local communities everywhere.
