from fastapi import APIRouter
from app.api.api_v1.endpoints import grouped, raw

api_router = APIRouter()
api_router.include_router(grouped.router, prefix="/grouped-findings", tags=["grouped"])
api_router.include_router(raw.router, prefix="/raw-findings", tags=["raw"])
