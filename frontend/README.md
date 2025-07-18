# St. Xavier's Canteen Management System - Frontend

This is the React frontend for the St. Xavier's Canteen Management System, built with:
- React 18 + TypeScript
- Vite for build tooling
- Material-UI for components
- Firebase Authentication
- Recharts for analytics

## Environment Setup

1. Copy `.env.example` to `.env` and update the values:
```bash
cp .env.example .env
```

2. Update the `VITE_API_URL` to point to your backend:
   - For local development: `http://localhost:8000`
   - For production: Your deployed backend URL on Render

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment to Vercel

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Set environment variables in Vercel dashboard:
   - `VITE_API_URL`: Your backend URL (e.g., `https://your-app.onrender.com`)
   - Firebase config variables if using Firebase auth

4. Deploy!

### Vercel Configuration

The project includes a `vercel.json` configuration for proper routing with React Router.

## Features

- **Google OAuth Authentication** - Role-based access (Student/Admin)
- **Menu Management** - Browse Kerala canteen menu items
- **Order System** - Place and track orders
- **Credit System** - Manage canteen credits
- **Analytics Dashboard** - Real-time analytics for admins
- **Responsive Design** - Works on mobile and desktop

## Project Structure

```
src/
├── components/     # React components
├── context/       # React context providers
├── config/        # Configuration files
├── data/          # Static data
└── assets/        # Static assets
```

## API Integration

The frontend communicates with the FastAPI backend for:
- User authentication and management
- Order processing
- Analytics data
- Real-time updates

See the backend README for API documentation.
