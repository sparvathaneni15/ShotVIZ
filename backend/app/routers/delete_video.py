from fastapi import APIRouter, HTTPException # type: ignore
from pydantic import BaseModel # type: ignore
import boto3 # type: ignore
from botocore.exceptions import ClientError # type: ignore
from app.config import settings

router = APIRouter()

class DeleteVideoRequest(BaseModel):
    video_url: str

@router.post("/delete_video")
def delete_video(data: DeleteVideoRequest):
    s3 = boto3.client("s3")
    bucket_name = settings.s3_bucket_name
    region = settings.aws_region

    # Extract the key from the full URL
    expected_prefix = f"https://{bucket_name}.s3.{region}.amazonaws.com/"
    if not data.video_url.startswith(expected_prefix):
        raise HTTPException(status_code=400, detail="Invalid video URL format")

    key = data.video_url[len(expected_prefix):]

    try:
        s3.delete_object(Bucket=bucket_name, Key=key)
        return {"message": "Video deleted successfully"}
    except ClientError as e:
        raise HTTPException(status_code=500, detail=f"Failed to delete video: {str(e)}")