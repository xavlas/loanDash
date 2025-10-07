# Vue Dashboard with Account Management

A modern, responsive Vue 3 dashboard application with comprehensive account management features.

## Features

### 🎨 Modern UI/UX
- Clean, responsive design using Tailwind CSS
- Mobile-first approach with collapsible sidebar
- Consistent design system with proper spacing and typography
- Hero Icons for consistent iconography

### 🔐 Authentication & Account Management
- Login/logout functionality
- Profile management with editable user information
- Settings page with preferences and security options
- Route guards for protected pages
- Mock authentication with demo credentials

### 📊 Dashboard Features
- Statistics cards with key metrics
- Interactive charts using Chart.js
- Recent activity feed
- Real-time data visualization

### 🛠 Technical Features
- Vue 3 with Composition API
- TypeScript for type safety
- Pinia for state management
- Vue Router for navigation
- Vite for fast development and building
- ESLint for code quality

## Demo Credentials

You can log in using these demo accounts:

- **Admin User**: `admin@example.com` / `password`
- **Regular User**: `user@example.com` / `password`

## Project Structure

```
vue-dashboard/
├── src/
│   ├── components/          # Reusable Vue components
│   │   ├── DashboardLayout.vue
│   │   ├── Header.vue
│   │   ├── Sidebar.vue
│   │   └── SidebarContent.vue
│   ├── views/              # Page components
│   │   ├── Dashboard.vue
│   │   ├── Login.vue
│   │   ├── Profile.vue
│   │   └── Settings.vue
│   ├── stores/             # Pinia stores
│   │   ├── auth.ts
│   │   └── dashboard.ts
│   ├── services/           # API services
│   │   └── auth.ts
│   ├── types/              # TypeScript type definitions
│   │   └── index.ts
│   ├── router/             # Vue Router configuration
│   │   └── index.ts
│   ├── App.vue             # Root component
│   ├── main.ts             # Application entry point
│   └── style.css           # Global styles
├── public/                 # Static assets
├── package.json            # Dependencies and scripts
├── vite.config.ts          # Vite configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── README.md               # This file
```

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Navigate to the project directory:
   ```bash
   cd vue-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Key Components

### Authentication Store (`src/stores/auth.ts`)
Manages user authentication state, login/logout functionality, and user profile updates.

### Dashboard Store (`src/stores/dashboard.ts`)
Handles dashboard data including statistics and chart information.

### Router Guards (`src/router/index.ts`)
Implements authentication guards to protect routes and redirect users appropriately.

### Services (`src/services/auth.ts`)
Mock authentication service that simulates API calls for login, registration, and profile updates.

## Customization

### Adding New Pages
1. Create a new Vue component in `src/views/`
2. Add the route to `src/router/index.ts`
3. Update the navigation in `src/components/SidebarContent.vue`

### Styling
The application uses Tailwind CSS for styling. You can customize the design by:
- Modifying `tailwind.config.js` for theme customization
- Updating component classes for specific styling
- Adding custom CSS in `src/style.css`

### API Integration
Replace the mock services in `src/services/` with real API calls:
- Update `authService` methods to call your backend
- Implement proper JWT token handling
- Add error handling and loading states

## Security Considerations

This is a demo application with mock authentication. For production use:
- Implement proper JWT token handling
- Add CSRF protection
- Use HTTPS in production
- Implement proper session management
- Add input validation and sanitization

## Browser Support

This application supports all modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.