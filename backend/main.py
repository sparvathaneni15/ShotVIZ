import os

# --- Import FastAPI and other dependencies ---
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
# app.mount("/videos", StaticFiles(directory="uploaded_videos"), name="videos")

# --- Import your DB and models so you can auto-create tables ---
from app.dependencies import get_db
from sqlalchemy.orm import Session
from app.database import engine, Base
import app.models as models

# --- Import your routers (each handles one slice of your API) ---
from app.routers import (users, 
                         players, 
                         practice_sessions,
                         shots,
                         tag_action_result,
                         actions,
                         results,
                         roles,
                         stats,
                         upload_video,
                         delete_video)

# --- Create all tables (only for dev; in prod use migrations) ---
Base.metadata.create_all(bind=engine)

# --- Instantiate the app ---
app = FastAPI(
    title="Practice Analytics API",
    version="0.1.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# --- CORS (allow your frontend origin to talk to this API) ---
origins = [
    os.getenv("FRONTEND_URL", "http://localhost:5173"),
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Mount each router on its path prefix ---
app.include_router(users.router)
app.include_router(players.router)
app.include_router(practice_sessions.router)
app.include_router(actions.router)
app.include_router(results.router)
app.include_router(shots.router)
app.include_router(roles.router)
app.include_router(tag_action_result.router)
app.include_router(upload_video.router)
app.include_router(stats.router)
app.include_router(delete_video.router)

# --- A simple health-check or root endpoint ---
@app.get("/", summary="Service health check")
async def root():
    return {"status": "ok", "message": "Practice Analytics API is running"}


# --- Optional: run with `python main.py` locally ---
if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=int(os.getenv("PORT", 8000)),
        reload=True,            # auto-reload on code changes (dev only)
    )