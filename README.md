# AI Study Planner Web App

A complete full-stack student study planner web app for an internship portfolio.

## Features

- Student signup and login
- JWT authentication
- Protected dashboard
- Daily task planner
- Attendance tracker with automatic percentage calculation
- Notes upload for PDF and images
- Rule-based dummy AI study suggestions
- Dark mode UI
- Responsive mobile and desktop design
- Deployment-ready for Render backend and Netlify frontend

## Tech Stack

### Frontend
- HTML
- CSS
- JavaScript
- Fetch API
- LocalStorage for JWT token

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Multer
- CORS
- dotenv

## Folder Structure

```txt
ai-study-planner/
│
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── .env.example
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Task.js
│   │   ├── Attendance.js
│   │   └── Note.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── taskRoutes.js
│   │   ├── attendanceRoutes.js
│   │   ├── noteRoutes.js
│   │   └── aiRoutes.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   └── uploads/
│
├── frontend/
│   ├── index.html
│   ├── login.html
│   ├── signup.html
│   ├── dashboard.html
│   ├── css/
│   │   └── style.css
│   └── js/
│       ├── auth.js
│       ├── dashboard.js
│       └── config.js
│
└── README.md
```

## Backend API Routes

### Auth
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/auth/me`

### Tasks
- `POST /api/tasks`
- `GET /api/tasks`
- `PUT /api/tasks/:id`
- `DELETE /api/tasks/:id`

### Attendance
- `POST /api/attendance`
- `GET /api/attendance`
- `DELETE /api/attendance/:id`

### Notes
- `POST /api/notes/upload`
- `GET /api/notes`
- `DELETE /api/notes/:id`

### AI Suggestion
- `POST /api/ai/suggest`

## Installation Steps in VS Code

### 1. Open Project

Open the `ai-study-planner` folder in VS Code.

### 2. Open Backend Terminal

```bash
cd backend
npm install
```

### 3. Create `.env` File

Inside the `backend` folder, copy `.env.example` and rename it to `.env`.

Example:

```env
PORT=5000
MONGO_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/ai-study-planner
JWT_SECRET=my_super_secret_key_12345
CLIENT_URL=http://127.0.0.1:5500
```

Do not share your real `.env` file publicly.

## MongoDB Atlas Setup

1. Go to MongoDB Atlas.
2. Create a free cluster.
3. Create a database user with username and password.
4. Go to Network Access.
5. Add IP address `0.0.0.0/0` for development.
6. Go to Database > Connect > Drivers.
7. Copy the connection string.
8. Paste it in backend `.env` as `MONGO_URI`.
9. Replace `<password>` with your database password.

Example:

```env
MONGO_URI=mongodb+srv://akash:yourpassword@cluster0.xxxxx.mongodb.net/ai-study-planner
```

## How to Run Backend

From the backend folder:

```bash
npm start
```

For development with auto restart:

```bash
npm run dev
```

Backend will run on:

```txt
http://localhost:5000
```

Test API health in browser:

```txt
http://localhost:5000
```

You should see:

```json
{ "message": "AI Study Planner API is running" }
```

## How to Run Frontend

Option 1: Use VS Code Live Server extension.

1. Install Live Server extension in VS Code.
2. Open `frontend/index.html`.
3. Right click and choose `Open with Live Server`.

Option 2: Open directly in browser.

Open:

```txt
frontend/index.html
```

Recommended local frontend URL with Live Server:

```txt
http://127.0.0.1:5500/frontend/index.html
```

If your frontend URL is different, update `CLIENT_URL` in backend `.env`.

## Important Frontend Backend Connection

Open this file:

```txt
frontend/js/config.js
```

For local development:

```js
const API_BASE_URL = 'http://localhost:5000';
```

After Render deployment, change it to your Render backend URL:

```js
const API_BASE_URL = 'https://your-backend-name.onrender.com';
```

## Deployment on Render Backend

1. Push the full project to GitHub.
2. Go to Render.
3. Create a new Web Service.
4. Connect your GitHub repository.
5. Select the `backend` folder as root directory if Render asks.
6. Build command:

```bash
npm install
```

7. Start command:

```bash
npm start
```

8. Add environment variables in Render:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_long_secret_key
CLIENT_URL=https://your-netlify-site.netlify.app
```

9. Deploy the backend.
10. Copy your Render backend URL.

## Deployment on Netlify Frontend

1. Go to Netlify.
2. Add new site.
3. Deploy manually or connect GitHub.
4. Select the `frontend` folder for deployment.
5. Before deployment, update:

```txt
frontend/js/config.js
```

Set:

```js
const API_BASE_URL = 'https://your-render-backend-url.onrender.com';
```

6. Deploy the frontend.
7. Copy your Netlify frontend URL.
8. Add that URL to Render environment variable `CLIENT_URL`.

## How to Use App

1. Start backend with `npm start`.
2. Start frontend with Live Server.
3. Open signup page.
4. Create a new student account.
5. Add tasks.
6. Add attendance records.
7. Upload PDF/image notes.
8. Generate AI study suggestions.
9. Toggle dark mode.
10. Logout when done.

## Future AI API Integration

Currently, AI suggestions are rule-based dummy responses in:

```txt
backend/routes/aiRoutes.js
```

Later, you can add Gemini/OpenAI API key in `.env`:

```env
GEMINI_API_KEY=your_key_here
OPENAI_API_KEY=your_key_here
```

Then replace the dummy logic with actual API calls.

## Common Errors and Fixes

### 1. Failed to fetch

Reason:
- Backend is not running.
- `API_BASE_URL` is wrong.
- CORS URL is wrong.

Fix:
- Start backend:

```bash
cd backend
npm start
```

- Check `frontend/js/config.js`:

```js
const API_BASE_URL = 'http://localhost:5000';
```

- Check backend `.env`:

```env
CLIENT_URL=http://127.0.0.1:5500
```

### 2. MongoDB connection error

Reason:
- Wrong MongoDB URI.
- Wrong password.
- IP not allowed in MongoDB Atlas.

Fix:
- Check `MONGO_URI`.
- Add `0.0.0.0/0` in MongoDB Atlas Network Access.
- Make sure database password does not contain unsupported symbols or encode them properly.

### 3. JWT error

Reason:
- Missing `JWT_SECRET` in `.env`.

Fix:

```env
JWT_SECRET=make_any_long_random_secret
```

Restart backend after editing `.env`.

### 4. Port already in use

Reason:
- Another app is using port 5000.

Fix on macOS/Linux:

```bash
lsof -i :5000
kill -9 PID_NUMBER
```

Or change port in `.env`:

```env
PORT=8000
```

Then update frontend config:

```js
const API_BASE_URL = 'http://localhost:8000';
```

### 5. Notes upload not working

Reason:
- File is not PDF/image.
- File is more than 5 MB.
- Backend uploads folder is missing.

Fix:
- Upload only PDF, JPG, PNG or WEBP.
- Keep file under 5 MB.
- Make sure `backend/uploads` folder exists.

## Beginner Tips

- Always run backend from the `backend` folder.
- Do not run frontend JavaScript files with Node.
- Open frontend pages in browser, not terminal.
- Keep MongoDB Atlas username/password safe.
- Never upload `.env` to GitHub.

## License

MIT
