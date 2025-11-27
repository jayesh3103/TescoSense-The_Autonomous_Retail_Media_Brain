from fastapi import APIRouter
from app.api.endpoints import campaigns, simulation

api_router = APIRouter()
api_router.include_router(campaigns.router, tags=["campaigns"])
api_router.include_router(simulation.router, tags=["simulation"])
