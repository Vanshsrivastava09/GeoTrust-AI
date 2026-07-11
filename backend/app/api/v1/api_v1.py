from fastapi import APIRouter
from .endpoints import sources_router, insights_router, trust_router

api_router = APIRouter()

api_router.include_router(sources_router, prefix="/sources", tags=["sources"])
api_router.include_router(insights_router, prefix="/insights", tags=["insights"])
api_router.include_router(trust_router, prefix="/trust", tags=["trust"])