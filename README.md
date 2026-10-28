# Agri-Tech — Smart Farming Management System

A beginner-friendly MERN starter project with a responsive React dashboard and Express/MongoDB API.

## Requirements
- Node.js 18+ (Node.js 16+ may work, but current Vite versions prefer newer Node)
- npm
- MongoDB local install or MongoDB Atlas connection string

## Run the project
1. Extract this ZIP and open the `agri-tech` folder in VS Code.
2. Open a terminal in this folder and run:
   ```bash
   npm install
   npm run install:all
   ```
3. Copy `server/.env.example` to `server/.env`, then add your MongoDB connection string and a long JWT secret.
4. Start both apps:
   ```bash
   npm run dev
   ```
5. Frontend: `http://localhost:5173`
   Backend health check: `http://localhost:5000/api/health`

The dashboard includes demo weather, soil-health, crop, pest-alert, resource-shop and consultation sections. Weather is demo data until you connect a weather provider API. The API includes registration/login, JWT protection, and farm CRUD routes.

## Demo data vs live services
- Weather and soil metrics shown in the dashboard are clearly presented as sample/demo values. No real sensor data is connected.
- To make weather live, create an API key with a weather provider and add a backend route that calls its forecast API. Keep API keys in `server/.env`, never in frontend code.
- Soil analysis requires actual soil test results or connected sensors; the sample indicators are not a scientific diagnosis.
- Authentication stores hashed passwords with bcrypt. Configure HTTPS and secure cookie/token handling before production deployment.

## API endpoints
- `GET /api/health`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/farms` (JWT required)
- `POST /api/farms` (JWT required)
- `PATCH /api/farms/:id` (JWT required)
- `DELETE /api/farms/:id` (JWT required)

This is a learning project starter, not a production-ready agricultural advisory service.
