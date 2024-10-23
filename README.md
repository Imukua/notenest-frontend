# NoteNest - Personal Journaling Web App

NoteNest is a modern, responsive journaling application built with Next.js and React, featuring a sleek UI design and robust functionality for managing personal journal entries.

## Table of Contents

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Project Structure](#project-structure)
4. [Routes](#routes)
5. [Building and Running the Web App](#building-and-running-the-web-app)
6. [Environment Variables](#environment-variables)

## Features

- User authentication (login, signup, logout)
- Journal entry creation, reading, updating, and deletion
- Dashboard with journal statistics
- Responsive design
- Animated UI elements
- Protected routes for authenticated users

## Technologies Used

1. **Next.js**: React framework for server-side rendering and routing
2. **React**: JavaScript library for building user interfaces
3. **TypeScript**: Typed superset of JavaScript for improved developer experience
4. **Tailwind CSS**: Utility-first CSS framework for styling
5. **Framer Motion**: Animation library for React
6. **Lucide React**: Icon library
7. **Shadcn UI**: UI component library
8. **JWT**: JSON Web Tokens for authentication

## Project Structure

    - `app/`: Next.js app directory with route components
    - `components/`: Reusable React components
    - `hooks/`: Custom React hooks (e.g., `useApi`, `useAuth`)
    - `lib/`: Utility functions, types, and constants
    - `public/`: Static assets

## Routes

### Public Routes

- `/`: Home page
- `/about`: About page
- `/features`: Features page
- `/login`: Login page
- `/signup`: Sign up page

### Protected Routes

- `/dashboard`: User dashboard
- `/journals/list`: List of journal entries
- `/journals/create`: Create new journal entry
- `/journals/read`: Read a specific journal entry
- `/account/edit`: Edit user account details

## Building and Running the Web App

1. **Install Dependencies:**   ```
   npm install   ```

2. **Set up Environment Variables:**
   Create a `.env.local` file in the root directory and add:   ```
   NEXT_PUBLIC_API_BASE_URL="http://localhost:3000"   ```

3. **Run the Development Server:**   ```
   npm run dev   ```

4. **Access the App:**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

- `NEXT_PUBLIC_API_BASE_URL`: The base URL for your API server

## Key Components

### AuthContext

Manages the authentication state of the application, including user information and access tokens.

### Header

The main navigation component, adapting its content based on the user's authentication status.

### TokenStore

Handles the storage and retrieval of authentication tokens in the browser's local storage.

### useApi Hook

A custom hook for making authenticated API requests to the backend server.

### useAuth Hook

Provides easy access to the authentication context throughout the application.

## API Routes

The application interacts with a backend API. The main routes are defined in `lib/routes/routes.ts`:
