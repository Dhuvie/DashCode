# Dashcode

### Competitive Programming Analytics Platform

## Overview

Dashcode is a full-stack web application designed to aggregate, analyze, and visualize competitive programming statistics from multiple platforms. The system provides real-time performance tracking, comparative analytics, and achievement-based progress monitoring through an intuitive dashboard interface.

### Supported Platforms

- **LeetCode** - Problem solving statistics and ranking data
- **Codeforces** - Contest ratings and problem submissions
- **CodeChef** - Rating history and contest participation
- **HackerRank** - Skill assessments and badge tracking

---

## Core Features

### Authentication & User Management
- Secure user authentication with email/password
- Session persistence using browser localStorage
- Protected dashboard access with automatic route guarding
- User profile management and logout functionality

### Data Integration & Synchronization
- **Multi-platform API integration** supporting four major competitive programming platforms
- **Real-time data fetching** with configurable auto-refresh intervals (default: 5 minutes)
- **Hybrid data collection** using official APIs (LeetCode, Codeforces) and web scraping (CodeChef, HackerRank)
- **Error handling** with graceful degradation for unavailable services

### Analytics & Visualization
- **Aggregate metrics** displaying total problems solved, average ratings, and contest participation
- **Interactive charts** including bar charts for platform comparison and pie charts for difficulty distribution
- **Comparative analysis** benchmarking user performance against global platform averages
- **Achievement system** with milestone tracking based on actual performance data

### Data Management
- **Export functionality** supporting JSON and CSV formats
- **Local storage** for user configuration and preferences
- **Data persistence** across browser sessions

### User Interface
- Responsive design optimized for desktop and mobile devices
- Glassmorphism design patterns with backdrop blur effects
- Smooth animations powered by Framer Motion and Anime.js
- Dynamic particle background with interactive elements

## Technology Stack

### Frontend Architecture

| Technology | Version | Purpose |
|------------|---------|----------|
| React | 18.2.0 | Component-based UI framework |
| TypeScript | 5.2.2 | Static type checking and enhanced IDE support |
| TailwindCSS | 3.3.6 | Utility-first CSS framework |
| Recharts | 2.10.3 | Composable charting library for data visualization |
| Framer Motion | 10.16.16 | Production-ready animation library |
| Anime.js | 3.2.2 | Lightweight animation engine |
| Vite | 5.0.8 | Next-generation frontend build tool |
| Axios | 1.6.2 | Promise-based HTTP client |

### Backend Infrastructure

| Technology | Version | Purpose |
|------------|---------|----------|
| Express.js | 4.18.2 | Web application framework for Node.js |
| Cheerio | 1.0.0-rc.12 | Server-side HTML parsing for web scraping |
| Node-fetch | 3.3.2 | HTTP request library |
| CORS | 2.8.5 | Cross-Origin Resource Sharing middleware |

### State Management & Context
- React Context API for global state management
- Custom hooks for authentication and dashboard data
- LocalStorage for persistent user configuration

## Installation & Setup

### System Requirements

- **Node.js**: Version 16.0.0 or higher
- **npm**: Version 7.0.0 or higher
- **Operating System**: Windows, macOS, or Linux
- **Browser**: Modern browser with ES6+ support (Chrome, Firefox, Safari, Edge)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/Dhuvie/dashcode.git
   cd dashcode
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   This command installs all required packages for both frontend and backend.

3. **Start the application**
   
   **Option A: Concurrent execution (Recommended)**
   ```bash
   npm run dev:all
   ```
   Starts both frontend (port 3000) and backend (port 5000) servers simultaneously.

   **Option B: Separate terminals**
   ```bash
   # Terminal 1: Backend API server
   npm run server
   
   # Terminal 2: Frontend development server
   npm run dev
   ```

4. **Access the application**
   
   Navigate to `http://localhost:3000` in your web browser.

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start frontend development server with hot reload |
| `npm run server` | Start backend API server |
| `npm run dev:all` | Start both frontend and backend concurrently |
| `npm run build` | Create production-optimized build |
| `npm run preview` | Preview production build locally |

## User Guide

### Initial Setup

1. **Account Creation**
   - Navigate to the application landing page
   - Click the "Get Started" button
   - Complete the registration form with email and password
   - Alternatively, use the "Sign In" option if you have an existing account

2. **Platform Configuration**
   - After authentication, access the configuration modal via the "Configure" button
   - Enter your usernames for each supported platform:
     - **LeetCode**: Your LeetCode username
     - **CodeChef**: Your CodeChef handle
     - **HackerRank**: Your HackerRank username
     - **Codeforces**: Your Codeforces handle
   - Click "Save Configuration" to persist settings

3. **Data Synchronization**
   - The system automatically fetches data from all configured platforms
   - Initial load may take 10-30 seconds depending on network conditions
   - Data is cached locally to improve subsequent load times

### Dashboard Navigation

**Header Section**
- User greeting with account name
- Last updated timestamp
- Auto-refresh indicator (when enabled)
- Refresh button for manual data sync
- Configure button for platform settings
- Settings button for application preferences
- Logout button

**Main Dashboard Components**

1. **Advanced Stats Panel**
   - Total problems solved across all platforms
   - Average rating calculated from CodeChef and Codeforces
   - Total contest participation count
   - Number of active platforms

2. **Data Visualization**
   - Platform comparison bar chart
   - Difficulty distribution pie chart (LeetCode data)
   - Advanced charts for detailed analysis

3. **Achievement System**
   - Eight milestone-based achievements
   - Progress bars showing completion percentage
   - Achievement unlocking based on real performance data

4. **Comparative Analysis**
   - Performance benchmarking against global averages
   - Visual indicators for above/below average performance

5. **Learning Resources**
   - Quick links to problem sets
   - Algorithm theory resources
   - Contest calendars

### Settings & Configuration

**Auto-Refresh**
- Enable/disable automatic data synchronization
- Default interval: 5 minutes
- Configurable through the Settings panel

**Data Export**
- Export statistics in JSON format (machine-readable)
- Export statistics in CSV format (spreadsheet-compatible)
- Share functionality for social media integration

## API Integration Details

### LeetCode Integration

**Method**: Official GraphQL API  
**Endpoint**: `https://leetcode.com/graphql`  
**Authentication**: None required (public profile data)  
**Implementation**: Backend proxy server

**Data Retrieved**:
- Total problems solved
- Difficulty breakdown (Easy, Medium, Hard)
- Global ranking position
- Reputation score
- Submission statistics

### Codeforces Integration

**Method**: Official REST API  
**Endpoint**: `https://codeforces.com/api/`  
**Authentication**: None required (public API)  
**Implementation**: Backend proxy server

**Data Retrieved**:
- Current rating and maximum rating
- Rank classification
- Problem submission count
- Contest participation history

### CodeChef Integration

**Method**: Web scraping (HTML parsing)  
**Target**: User profile pages  
**Authentication**: None required  
**Implementation**: Cheerio-based server-side scraping

**Data Retrieved**:
- Current rating
- Star classification
- Global and country rankings
- Problems solved count
- Contest participation count

**Limitations**: Dependent on HTML structure stability. May require updates if CodeChef modifies their profile page layout.

### HackerRank Integration

**Method**: Web scraping (HTML parsing)  
**Target**: User profile pages  
**Authentication**: None required  
**Implementation**: Cheerio-based server-side scraping

**Data Retrieved**:
- Badge count
- Star rating
- Skill level
- Problems solved
- Global rank

**Limitations**: Dependent on HTML structure stability. May require updates if HackerRank modifies their profile page layout.

### Error Handling

The system implements comprehensive error handling:
- Network timeout handling (30-second timeout)
- Invalid username detection
- Platform unavailability fallback
- Graceful degradation for partial data
- User-friendly error messages

## Production Deployment

### Build Process

1. **Create production build**
   ```bash
   npm run build
   ```
   This generates an optimized production bundle in the `dist/` directory with:
   - Minified JavaScript and CSS
   - Tree-shaken dependencies
   - Optimized assets
   - Source maps for debugging

2. **Preview production build**
   ```bash
   npm run preview
   ```
   Serves the production build locally for testing before deployment.

### Deployment Options

**Frontend Deployment**
- **Vercel**: Recommended for Next.js-style deployments
- **Netlify**: Excellent for static site hosting with CI/CD
- **GitHub Pages**: Free hosting for public repositories
- **AWS S3 + CloudFront**: Enterprise-grade CDN distribution

**Backend Deployment**
- **Heroku**: Simple deployment with add-ons support
- **Railway**: Modern platform with automatic deployments
- **DigitalOcean App Platform**: Managed container hosting
- **AWS EC2**: Full control over server configuration

### Environment Configuration

Create a `.env` file for production environment variables:
```env
PORT=5000
NODE_ENV=production
CORS_ORIGIN=https://yourdomain.com
```

### Performance Optimization

- Enable gzip compression on the server
- Implement caching strategies (Redis recommended)
- Use CDN for static assets
- Enable HTTP/2 for improved performance
- Implement rate limiting for API endpoints

## Project Architecture

```
dashcode/
├── src/
│   ├── components/              # React UI components
│   │   ├── AchievementSystem.tsx       # Milestone tracking component
│   │   ├── AdvancedCharts.tsx          # Data visualization components
│   │   ├── AdvancedStats.tsx           # Aggregate metrics display
│   │   ├── AnimatedDifficultyBreakdown.tsx  # Pie chart component
│   │   ├── AnimatedProgressChart.tsx   # Bar chart component
│   │   ├── AnimatedStatCard.tsx        # Individual metric cards
│   │   ├── AuthModal.tsx               # Authentication modal
│   │   ├── ComparisonView.tsx          # Global comparison component
│   │   ├── ConfigModal.tsx             # Platform configuration modal
│   │   ├── ErrorBoundary.tsx           # Error handling wrapper
│   │   ├── ExportData.tsx              # Data export functionality
│   │   ├── LoadingAnimation.tsx        # Loading state component
│   │   ├── NotificationToast.tsx       # Toast notification system
│   │   ├── ParticleBackground.tsx      # Animated background
│   │   ├── QuickActions.tsx            # Resource links component
│   │   └── SettingsPanel.tsx           # Application settings
│   ├── contexts/                # React Context providers
│   │   ├── AuthContext.tsx             # Authentication state management
│   │   └── DashboardContext.tsx        # Dashboard data management
│   ├── services/                # API integration layer
│   │   └── api.ts                      # API service functions
│   ├── types.ts                 # TypeScript type definitions
│   ├── App.tsx                  # Root application component
│   └── main.tsx                 # Application entry point
├── server/
│   └── index.js                 # Express.js backend server
│       ├── API endpoints        # /api/leetcode, /api/codeforces, etc.
│       ├── Web scraping logic   # Cheerio-based scraping
│       └── CORS configuration   # Cross-origin setup
├── public/                      # Static assets
│   └── index.html               # HTML template
├── .env.example                 # Environment variable template
├── package.json                 # Project dependencies and scripts
├── tsconfig.json                # TypeScript configuration
├── tailwind.config.js           # TailwindCSS configuration
├── vite.config.ts               # Vite build configuration
└── README.md                    # Project documentation
```

## Contributing

### Development Workflow

1. **Fork the repository**
   ```bash
   git clone https://github.com/Dhuvie/dashcode.git
   cd dashcode
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow existing code style and conventions
   - Add TypeScript types for new functions
   - Update documentation as needed

4. **Test your changes**
   ```bash
   npm run dev:all
   ```
   Verify functionality in the browser.

5. **Commit and push**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   git push origin feature/your-feature-name
   ```

6. **Open a Pull Request**
   - Provide a clear description of changes
   - Reference any related issues
   - Ensure all checks pass

### Contribution Areas

**Platform Integration**
- Add support for additional platforms (AtCoder, TopCoder, SPOJ)
- Improve existing API integrations
- Enhance web scraping reliability

**Features**
- Historical data tracking and trend analysis
- Advanced filtering and search capabilities
- Customizable dashboard layouts
- Dark/light theme implementation

**Testing**
- Unit tests for components
- Integration tests for API endpoints
- End-to-end testing with Playwright or Cypress

**Documentation**
- API documentation
- Component documentation
- Deployment guides
- Troubleshooting guides

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for complete details.

## Acknowledgments

This project utilizes the following open-source libraries and resources:

- **[React](https://reactjs.org/)** - UI framework
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[TailwindCSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Recharts](https://recharts.org/)** - Charting library
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library
- **[Lucide Icons](https://lucide.dev/)** - Icon library
- **[Express.js](https://expressjs.com/)** - Backend framework
- **[Cheerio](https://cheerio.js.org/)** - HTML parsing library

## Support

For issues, questions, or feature requests, please open an issue on the [GitHub repository](https://github.com/Dhuvie/dashcode/issues).

