from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.agents.sensing_agent import SensingAgent
from app.agents.strategy_agent import StrategyAgent
from app.agents.creative_agent import CreativeAgent
from app.agents.booking_agent import BookingAgent
from app.agents.learning_agent import LearningAgent

router = APIRouter()

@router.post("/simulate/step")
async def trigger_simulation_step(db: Session = Depends(get_db)):
    results = {}
    
    # 1. Sense
    sensing = SensingAgent(db)
    opp = await sensing.run()
    if opp: results["sensing"] = f"Opportunity: {opp.description}"
    
    # 2. Plan
    strategy = StrategyAgent(db)
    camp = await strategy.run()
    if camp: results["strategy"] = f"Planned: {camp.name}"
    
    # 3. Create
    creative = CreativeAgent(db)
    crt = await creative.run()
    if crt: results["creative"] = f"Created assets for {crt.campaign_id}"
    
    # 4. Book
    booking = BookingAgent(db)
    booked = await booking.run()
    if booked: results["booking"] = f"Booked {booked.name}"
    
    # 5. Learn
    learning = LearningAgent(db)
    log = await learning.run()
    if log: results["learning"] = f"Logged performance for {log.campaign_id}"
    
    return {"status": "success", "actions": results}
