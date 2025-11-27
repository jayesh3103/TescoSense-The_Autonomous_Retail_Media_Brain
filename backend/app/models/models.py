from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, JSON, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid
import enum
from app.core.database import Base

class CampaignStatus(str, enum.Enum):
    PLANNED = "PLANNED"
    ACTIVE = "ACTIVE"
    COMPLETED = "COMPLETED"
    PAUSED = "PAUSED"

class Campaign(Base):
    __tablename__ = "campaigns"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String, index=True)
    status = Column(String, default=CampaignStatus.PLANNED)
    budget = Column(Float)
    target_audience = Column(JSON)
    strategy_details = Column(JSON)  # Store strategy reasoning
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    creatives = relationship("Creative", back_populates="campaign")
    performance_logs = relationship("PerformanceLog", back_populates="campaign")

class Creative(Base):
    __tablename__ = "creatives"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    campaign_id = Column(String, ForeignKey("campaigns.id"))
    headline = Column(String)
    ad_copy = Column(String)
    image_url = Column(String)
    asset_type = Column(String) # e.g., "banner", "video"
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    campaign = relationship("Campaign", back_populates="creatives")

class PerformanceLog(Base):
    __tablename__ = "performance_logs"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    campaign_id = Column(String, ForeignKey("campaigns.id"))
    impressions = Column(Integer, default=0)
    clicks = Column(Integer, default=0)
    conversions = Column(Integer, default=0)
    spend = Column(Float, default=0.0)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())

    campaign = relationship("Campaign", back_populates="performance_logs")

class AgentLog(Base):
    __tablename__ = "agent_logs"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    agent_name = Column(String)
    action = Column(String)
    details = Column(JSON)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())

class Opportunity(Base):
    __tablename__ = "opportunities"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    description = Column(String)
    score = Column(Float)
    data_source = Column(String) # e.g., "weather", "sales"
    status = Column(String, default="OPEN") # OPEN, PROCESSED, IGNORED
    created_at = Column(DateTime(timezone=True), server_default=func.now())
