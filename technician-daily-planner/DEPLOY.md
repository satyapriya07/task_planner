# Deployment Instructions

## Backend (Render.com)

1. **New Web Service**: Connect your GitHub repo.
2. **Root Directory**: `technician-daily-planner/backend`
3. **Build Command**: `npm install`
4. **Start Command**: `npm start`
5. **Environment Variables**:
   - `MONGODB_URI`: Your MongoDB connection string (e.g., from MongoDB Atlas).
   - `PORT`: `5001` (optional, Render sets its own PORT usually, code handles `process.env.PORT`).

## Frontend (Vercel)

1. **New Project**: Import `technician-daily-planner/frontend`.
2. **Framework Preset**: Angular.
3. **Build Command**: `npm run build` (This runs `set-env.js` + `ng build`).
4. **Output Directory**: `dist/frontend/browser`
5. **Environment Variables**:
   - `API_URL`: The URL of your deployed Backend + `/api`.
     - Example: `https://technician-planner-backend.onrender.com/api`
     - **Important**: Do not include trailing slash if your code appends (`/tasks`). Code uses `${environment.apiUrl}/tasks`.

## Local Development
- Backend: `npm start` (Runs on http://localhost:5001)
- Frontend: `npm start` (Runs on http://localhost:4200)
