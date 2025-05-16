from fastapi import APIRouter, UploadFile, File, Depends
from fastapi.responses import JSONResponse
import shutil
import uuid
import os

router = APIRouter()

UPLOAD_FOLDER = "uploaded_videos"

@router.post("/upload")
async def upload_video(file: UploadFile = File(...)):
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)
    filename = f"{uuid.uuid4()}_{file.filename}"
    filepath = os.path.join(UPLOAD_FOLDER, filename)

    with open(filepath, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Optionally insert file info into DB here
    return JSONResponse({"filename": filename, "path": filepath})