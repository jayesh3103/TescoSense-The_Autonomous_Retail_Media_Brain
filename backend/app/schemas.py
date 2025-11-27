from pydantic import BaseModel
from typing import List, Optional, Any
from datetime import datetime
from app.models.models import CampaignStatus

class CreativeBase(BaseModel):
    headline: str
    ad_copy: str
    image_url: str
    asset_type: str

class Creative(CreativeBase):
    id: str
    campaign_id: str
    created_at: datetime

    class Config:
        from_attributes = True

class PerformanceLogBase(BaseModel):
    impressions: int
    clicks: int
    conversions: int
    spend: float

class PerformanceLog(PerformanceLogBase):
    id: str
    campaign_id: str
    timestamp: datetime

    class Config:
        from_attributes = True

class CampaignBase(BaseModel):
    name: str
    status: CampaignStatus
    budget: float
    target_audience: Any
    strategy_details: Any

class Campaign(CampaignBase):
    id: str
    created_at: datetime
    updated_at: Optional[datetime] = None
    creatives: List[Creative] = []
    performance_logs: List[PerformanceLog] = []

    class Config:
        from_attributes = True

class OpportunityBase(BaseModel):
    description: str
    score: float
    data_source: str
    status: str

class Opportunity(OpportunityBase):
    id: str
    created_at: datetime

    class Config:
        from_attributes = True
