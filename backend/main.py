import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# --- Import your DB and models so you can auto-create tables ---
from backend.app.database import engine, Base
import backend.app.models as models

# --- Import your routers (each handles one slice of your API) ---
from routers import users, players, sessions, actions, results, shots

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
    os.getenv("FRONTEND_URL", "http://localhost:3000"),
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Mount each router on its path prefix ---
app.include_router(users.router,     prefix="/users",    tags=["users"])
app.include_router(players.router,   prefix="/players",  tags=["players"])
app.include_router(sessions.router,  prefix="/sessions", tags=["sessions"])
app.include_router(actions.router,   prefix="/actions",  tags=["actions"])
app.include_router(results.router,   prefix="/results",  tags=["results"])
app.include_router(shots.router,     prefix="/shots",    tags=["shots"])

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