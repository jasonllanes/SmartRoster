# Smart Roster - Daily Time Record System

A modern, responsive web application for daily time record management built with **React.js**, **TypeScript**, and **Tailwind CSS**. The system features camera-based verification with GPS location tracking and comprehensive attendance monitoring.

## 🎨 UI Framework & Language

- **TypeScript** - Type-safe development with full React support
- **Tailwind CSS** - Utility-first CSS framework for modern, responsive design
- **Dark Mode Support** - Fully functional dark/light theme toggle
- **Responsive Design** - Mobile-first approach with optimized layouts

## Features

### 🏠 Landing Page

- Modern, attractive landing page with feature highlights
- Gradient backgrounds and smooth animations
- Fully responsive with dark mode support

### 🔐 Authentication

- Secure login system
- Session management with localStorage
- Protected routes for authenticated users

### 📱 Sidebar Navigation (NEW!)

- **Left-side navigation** for authenticated users
- **Smart Roster logo** at the top
- **Collapsible/Expandable** sidebar (desktop)
- Profile section with avatar
- Active route highlighting
- Mobile-responsive with hamburger menu
- Dark mode toggle integrated

### 📊 Dashboard

- Real-time status cards showing:
  - On Duty personnel
  - On Leave personnel
  - On Patrol personnel
  - In Office personnel
- Recent time logs table with detailed information
- Mobile-responsive design with adaptive table layout
- Modern card-based UI with gradients

### 📸 Time In/Out System (ENHANCED!)

- **Live Camera Preview**: See yourself before capturing
- **Real-time Overlay**: Location and timestamp visible during preview
- **HD Quality**: 1280x720 resolution capture
- **Photo Verification**: Review and retake photos before submission
- **GPS Location Tracking**: Automatic location detection and verification
- **Image Overlay**: Generated images include:
  - Current date and time
  - GPS coordinates
  - Location accuracy
- **Status Selection**: Dropdown with predefined options:
  - On Patrol
  - In Office
  - Field Work
  - Meeting
  - Others (with custom input field)
- **Beautiful UI**: Gradient buttons and smooth transitions

### 👤 User Profile

- View and edit personal information
- Profile picture upload with preview
- Employee details management
- Department and position information
- Editable fields with save/cancel functionality

## Technology Stack

- **React.js** (v18.2.0) - UI Framework
- **TypeScript** (v5.3.0) - Type-safe JavaScript
- **Tailwind CSS** (v3.3.0) - Styling framework
- **React Router DOM** (v6.20.0) - Navigation and routing
- **Lucide React** (v0.292.0) - Icon library
- **Context API** - State management with TypeScript
- **LocalStorage** - Client-side data persistence
- **Browser APIs**:
  - Navigator.mediaDevices (Camera access with HD support)
  - Geolocation API (GPS tracking)
  - Canvas API (Image manipulation)

## Project Structure

```
smart-roster/
├── public/
│   ├── assets/
│   │   └── smart_roster_logo.png
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Layout.tsx        (Updated for sidebar)
│   │   └── Sidebar.tsx       (Collapsible sidebar navigation)
│   ├── context/
│   │   ├── AuthContext.tsx   (TypeScript)
│   │   └── ThemeContext.tsx  (TypeScript)
│   ├── pages/
│   │   ├── Dashboard.tsx     (TypeScript with Tailwind)
│   │   ├── LandingPage.tsx   (TypeScript with Tailwind)
│   │   ├── LoginPage.tsx     (TypeScript with Tailwind)
│   │   ├── Profile.tsx       (TypeScript with Tailwind)
│   │   └── TimeRecord.tsx    (TypeScript with live preview)
│   ├── App.tsx               (TypeScript)
│   ├── index.tsx             (TypeScript)
│   ├── index.css             (Tailwind directives)
│   └── react-app-env.d.ts    (TypeScript declarations)
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json             (TypeScript configuration)
└── package.json
```

## Installation

1. Navigate to the project directory:

```bash
cd "d:\All Projects\Web Projects\Smart Roster"
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## NPM Scripts

- **`npm run dev`** - Start development server
- **`npm run build`** - Build production bundle
- **`npm run deploy`** - Build and prepare for deployment
- **`npm test`** - Run tests

## Usage

### Login

1. Navigate to the login page
2. Enter your email and password
3. Click "Sign In" to access the system

### Time In/Out (WITH LIVE PREVIEW!)

1. Go to "Time In/Out" from the sidebar
2. Select "Time In" or "Time Out"
3. Click "Start Camera" to activate your device camera
4. **See live preview** with date, time, and location overlay
5. Position yourself in the frame
6. Click "Capture Photo" to take a photo
7. Review the captured image with overlaid information
8. Select your status from the dropdown
9. If "Others" is selected, specify your custom status
10. Click "Submit" to record your time

### View Dashboard

- Access the dashboard to see:
  - Current status statistics
  - Recent time logs
  - Attendance patterns

### Manage Profile

1. Click on your profile picture in the sidebar
2. Navigate to "My Profile"
3. Click "Edit Profile" to update information
4. Upload a new profile picture if desired
5. Click "Save Changes" to update

### Toggle Dark Mode

- Click the moon/sun icon in the sidebar to switch themes
- Theme preference is saved automatically

### Sidebar Navigation

- **Desktop**: Click the arrow icon to collapse/expand sidebar
- **Mobile**: Tap the hamburger menu to open/close navigation
- Logo always visible and clickable
- Active page highlighted with gradient

## Features Highlights

### 🎥 Enhanced Camera System

- **Live video preview** before capture
- Real-time location and timestamp overlay
- HD resolution (1280x720)
- Retake functionality
- Automatic camera cleanup

### 🎨 Modern UI with Tailwind

- Utility-first CSS approach
- Consistent design system
- Responsive grid layouts
- Gradient backgrounds and buttons
- Smooth transitions and animations
- Card-based components

### 🌙 Dark Mode

- System-wide theme support
- Smooth color transitions
- Persistent preference storage
- Tailwind dark mode classes

### 📱 Responsive Design

- Mobile-first approach
- Breakpoint-based layouts
- Touch-friendly interface
- Adaptive navigation (sidebar/hamburger)
- Responsive tables and cards

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

**Note**: Camera and GPS features require HTTPS in production or localhost for development.

## Security Considerations

- All routes except landing and login pages are protected
- User authentication state managed securely
- Camera and location permissions must be granted by user
- Session data stored in localStorage (consider httpOnly cookies in production)

## Future Enhancements

- Backend API integration
- Database storage for time records
- Admin dashboard for management
- Report generation and export
- Multi-language support
- Push notifications
- Biometric authentication
- Advanced analytics and insights
- Real-time notifications
- Export to PDF/Excel

## Development Notes

This is an initial system design with demo functionality. For production deployment:

1. Implement proper backend API
2. Add database integration
3. Implement proper authentication with JWT
4. Add input validation and sanitization
5. Implement error handling and logging
6. Add unit and integration tests
7. Optimize performance and bundle size
8. Set up CI/CD pipeline
9. Configure environment variables
10. Implement proper security measures

## License

This project is part of a portfolio demonstration.

## Contact

For questions or feedback, please contact the development team.

## Features

### 🏠 Landing Page

- Modern, attractive landing page with feature highlights
- Responsive design for all devices
- Smooth animations and transitions

### 🔐 Authentication

- Secure login system
- Session management with localStorage
- Protected routes for authenticated users

### 📊 Dashboard

- Real-time status cards showing:
  - On Duty personnel
  - On Leave personnel
  - On Patrol personnel
  - In Office personnel
- Recent time logs table with detailed information
- Mobile-responsive design with adaptive table layout

### 📸 Time In/Out System

- **Camera Integration**: Capture photos using device camera
- **GPS Location Tracking**: Automatic location detection and verification
- **Image Overlay**: Generated images include:
  - Current date and time
  - GPS coordinates
  - Location accuracy
- **Status Selection**: Dropdown with predefined options:
  - On Patrol
  - In Office
  - Field Work
  - Meeting
  - Others (with custom input field)
- **Photo Verification**: Review and retake photos before submission

### 👤 User Profile

- View and edit personal information
- Profile picture upload
- Employee details management
- Department and position information

### 🎨 User Interface

- **Navigation Bar**:
  - Profile picture display (top right)
  - Dropdown menu with:
    - My Profile
    - Log Out
  - Responsive mobile menu
- **Dark Mode Toggle**:
  - Smooth theme switching
  - Persistent preference storage
  - System-wide dark/light mode support
- **Fully Responsive**:
  - Mobile-first design approach
  - Tablet and desktop optimized
  - Touch-friendly interface

## Technology Stack

- **React.js** (v18.2.0) - UI Framework
- **React Router DOM** (v6.20.0) - Navigation and routing
- **Lucide React** (v0.292.0) - Icon library
- **Context API** - State management
- **CSS3** - Styling with CSS variables for theming
- **LocalStorage** - Client-side data persistence
- **Browser APIs**:
  - Navigator.mediaDevices (Camera access)
  - Geolocation API (GPS tracking)
  - Canvas API (Image manipulation)

## Project Structure

```
smart-roster/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Layout.js
│   │   ├── Layout.css
│   │   ├── Navbar.js
│   │   └── Navbar.css
│   ├── context/
│   │   ├── AuthContext.js
│   │   └── ThemeContext.js
│   ├── pages/
│   │   ├── Dashboard.js
│   │   ├── Dashboard.css
│   │   ├── LandingPage.js
│   │   ├── LandingPage.css
│   │   ├── LoginPage.js
│   │   ├── LoginPage.css
│   │   ├── Profile.js
│   │   ├── Profile.css
│   │   ├── TimeRecord.js
│   │   └── TimeRecord.css
│   ├── App.js
│   ├── index.js
│   └── index.css
└── package.json
```

## Installation

1. Navigate to the project directory:

```bash
cd "d:\All Projects\Web Projects\Smart Roster"
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

4. Open your browser and navigate to `http://localhost:3000`

## Usage

### Login

1. Navigate to the login page
2. Enter your email and password
3. Click "Sign In" to access the system

### Time In/Out

1. Go to "Time In/Out" from the navigation menu
2. Select "Time In" or "Time Out"
3. Click "Start Camera" to activate your device camera
4. Position yourself in the frame
5. Click "Capture Photo" to take a photo
6. The system will overlay:
   - Current date and time
   - Your GPS location coordinates
7. Select your status from the dropdown
8. If "Others" is selected, specify your custom status
9. Click "Submit" to record your time

### View Dashboard

- Access the dashboard to see:
  - Current status statistics
  - Recent time logs
  - Attendance patterns

### Manage Profile

1. Click on your profile picture in the top right
2. Select "My Profile" from the dropdown
3. Click "Edit Profile" to update information
4. Upload a new profile picture if desired
5. Click "Save Changes" to update

### Toggle Dark Mode

- Click the moon/sun icon in the navigation bar to switch between light and dark themes

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

**Note**: Camera and GPS features require HTTPS in production or localhost for development.

## Security Considerations

- All routes except landing and login pages are protected
- User authentication state is managed securely
- Camera and location permissions must be granted by the user
- Session data is stored in localStorage (consider using httpOnly cookies in production)

## Future Enhancements

- Backend API integration
- Database storage for time records
- Admin dashboard for management
- Report generation and export
- Multi-language support
- Push notifications
- Biometric authentication
- Advanced analytics and insights

## Development Notes

This is an initial system design with demo functionality. For production deployment:

1. Implement a proper backend API
2. Add database integration
3. Implement proper authentication with JWT
4. Add input validation and sanitization
5. Implement error handling and logging
6. Add unit and integration tests
7. Optimize performance and bundle size
8. Set up CI/CD pipeline
9. Configure environment variables
10. Implement proper security measures

## License

This project is part of a portfolio demonstration.

## Contact

For questions or feedback, please contact the development team.
