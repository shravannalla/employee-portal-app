# Employee Portal Application

A full-stack employee management application with Node.js backend and React frontend.

## Prerequisites

- Node.js (v14+)
- npm
- MongoDB

## Setup

### Backend Server

```bash
cd employee_portal_server
npm install
```

Update `.env` file with your configuration:
```env
SERVER_PORT=3000
MONGO_URI=your_mongodb_connection_string
DB_NAME=employee_portal
EMPLOYEE_PORTAL_SECRET=your_secret_key
```

Start the server:
```bash
npm run dev
```

Server runs on `http://localhost:3000`

### Frontend Client

```bash
cd employee-portal
npm install
```

Start the client:
```bash
npm run dev
```

Client runs on `http://localhost:5173`

## Running the Application

1. Start the backend server first:
```bash
cd employee_portal_server
npm run dev
```

2. In a new terminal, start the frontend client:
```bash
cd employee-portal
npm run dev
```

Both server and client must be running for the application to work.

## Technology Stack

- **Backend:** Node.js, Express, MongoDB, JWT
- **Frontend:** React, TypeScript, Vite, Material-UI
