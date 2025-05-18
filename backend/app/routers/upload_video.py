from fastapi import APIRouter, UploadFile, File, HTTPException
import boto3
from botocore.exceptions import NoCredentialsError, ClientError
import os
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
async def upload_video(file: UploadFile = File(...)):
    s3_url = upload_to_s3(file)  # Your own function or library call
    return {"video_url": s3_url}