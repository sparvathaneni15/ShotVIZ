import os

# --- Import FastAPI and other dependencies ---
from fastapi import FastAPI, Depends # type: ignore
from fastapi.middleware.cors import CORSMiddleware # type: ignore
from fastapi.staticfiles import StaticFiles # type: ignore
# app.mount("/videos", StaticFiles(directory="uploaded_videos"), name="videos")

# --- Import your DB and models so you can auto-create tables ---
from app.dependencies import get_db
from sqlalchemy.orm import Session # type: ignore
from app.database import engine, Base
import app.models as models

# --- Import your routers (each handles one slice of your API) ---


# --- Create all tables (only for dev; in prod use migrations) ---
Base.metadata.create_all(bind=engine)

# --- Instantiate the app ---
app = FastAPI(
    title="ShotVIZ API",
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


# --- A simple health-check or root endpoint ---
@app.get("/", summary="Service health check")
async def root():
    return {"status": "ok", "message": "Practice Analytics API is running"}


# --- Optional: run with `python main.py` locally ---
if __name__ == "__main__":
    import uvicorn # type: ignore

    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=int(os.getenv("PORT", 8000)),
        reload=True,            # auto-reload on code changes (dev only)
    )