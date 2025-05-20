from fastapi import APIRouter, UploadFile, File, HTTPException
import boto3
from botocore.exceptions import NoCredentialsError, ClientError
import os
import shutil
import subprocess
from app.config import settings

def upload_to_s3(file: UploadFile) -> str:
    s3 = boto3.client("s3",
                      aws_access_key_id=settings.aws_access_key_id,
                      aws_secret_access_key=settings.aws_secret_access_key,
                      region_name=settings.aws_region)

    try:
        s3.upload_fileobj(file.file, settings.s3_bucket_name, file.filename,
                          ExtraArgs={"ContentType": file.content_type})
        s3_url = f"https://{settings.s3_bucket_name}.s3.{settings.aws_region}.amazonaws.com/{file.filename}"
        return s3_url
    except NoCredentialsError:
        raise HTTPException(status_code=500, detail="AWS credentials not found.")
    except ClientError as e:
        print("S3 upload error:", e)
        raise HTTPException(status_code=500, detail=f"Failed to upload to S3: {e}")
    except Exception as e:
        print("Unexpected error:", e)
        raise HTTPException(status_code=500, detail=f"Unexpected error: {e}")

router = APIRouter()

@router.post("/upload_video")
async def transcode_and_upload_video(raw_video: UploadFile = File(...)):
    input_path = "/tmp/input.mp4"
    output_path = "/tmp/output.mp4"

    # Save raw upload to disk
    with open(input_path, "wb") as buffer:
        shutil.copyfileobj(raw_video.file, buffer)

    # Transcode with ffmpeg
    ffmpeg_command = [
        "ffmpeg", "-y", "-i", input_path,
        "-c:v", "libx264", "-c:a", "aac", "-b:a", "192k",
        output_path
    ]
    try:
        subprocess.run(ffmpeg_command, check=True)
    except subprocess.CalledProcessError as e:
        raise HTTPException(status_code=500, detail=f"ffmpeg transcoding failed: {e}")

    # Upload transcoded file
    with open(output_path, "rb") as f:
        class FileLike:
            file = f
            filename = raw_video.filename
            content_type = "video/mp4"
        s3_url = upload_to_s3(FileLike())

    # Cleanup
    os.remove(input_path)
    os.remove(output_path)
    return {"video_url": s3_url}
