# 🏀 ShotVIZ— Developer Onboarding

Welcome to the **Practice Film Analytics** project! This guide provides an overview of the technologies in use and the key features of the application so you can quickly get up to speed.

---

## 📌 Project Summary

This is a full-stack web application designed to help our university basketball team analyze practice film. It allows coaches to tag game actions, track player roles, and generate insights from video footage.

---

## 🧱 Technology Stack

### Frontend (React + TypeScript)
- **React**: Handles the user interface and routing.
- **TypeScript**: Ensures type safety across components.
- **TailwindCSS**: Utility-first styling for rapid UI development.
- **Axios**: Used for API requests to the backend.
- **Vite**: Fast build tool for local development.

### Backend (FastAPI + SQLAlchemy)
- **FastAPI**: High-performance Python web framework for building REST APIs.
- **SQLAlchemy**: ORM for handling database models and queries.
- **Pydantic**: Data validation and serialization.
- **PostgreSQL**: Relational database storing all persistent data.

### Cloud Infrastructure (AWS)
- **S3**: Stores video files securely.
- **EC2**: Hosts the backend server.
- **CloudFront**: Distributes video content for low-latency playback.
- **IAM, Route53, etc.**: Supporting services for deployment and access control.

---

## ⚙️ Core Features

### 🎥 Video Tagging
- Upload and play back practice footage.
- Tag key actions (e.g., ball screens, transitions, defensive breakdowns).
- Timestamped annotations linked to the video.

### 🧑‍🤝‍🧑 Player & Role Tracking
- Assign players to roles per possession (e.g., ball-handler, screener, help defender).
- Record stats per session and filter by player, session, or action.

### 📊 Practice Session Analytics
- View stats breakdown by player and role.
- Analyze trends over multiple sessions.
- Filter by tagged actions, game context, or player groups.

### 🔍 Search and Review
- Quickly filter clips by action type or player involvement.
- Summarized views to aid post-practice review and game preparation.

---

## 🗃️ Key Database Tables

| Table               | Description                                |
|--------------------|--------------------------------------------|
| `users`            | Authentication and permissions (planned)   |
| `players`          | Metadata for each player                   |
| `practice_sessions`| Metadata and video URL for each session    |
| `video_clips`      | Tagged segments of the session             |
| `actions`          | Action types and player roles              |
| `stats`            | Player performance metrics per session     |

---

## 🔄 Development Workflow

1. Clone the repo and run the frontend and backend locally:
   ```bash
   cd frontend && npm install && npm run dev
   cd backend && uvicorn main:app --reload
   ```
2. Ensure you have PostgreSQL running and credentials set up in `.env`.
3. Run migrations if schema has changed.
4. Use the Swagger docs at `http://localhost:8000/docs` to test API endpoints.

---

## 🚧 In Progress / Coming Soon

- Auth and user roles
- AI-assisted tagging
- More advanced stat breakdowns (e.g., lineup analytics, efficiency metrics)

---

## 🧠 Git Branching Strategy

### Branches
- `main`: Always reflects production-ready code.
- `dev`: Development integration branch.
- `feature/<name>`: New feature branches from `dev`.
- `bugfix/<name>`: Small fix branches from `dev`.

### Workflow
1. Checkout from `dev`:
   ```bash
   git checkout -b feature/<name>
   ```
2. Work and commit locally.
3. Push to GitHub and open a **pull request** into `dev`.
4. You (project lead) will review and merge when it’s ready.

### Merging to Main
- Merge from `dev` to `main` only after full testing and deploy readiness.

---

Please reach out with any questions or issues during setup or development!
