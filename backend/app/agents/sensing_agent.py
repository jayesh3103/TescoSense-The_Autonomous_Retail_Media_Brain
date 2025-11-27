from app.agents.base import BaseAgent
from app.simulation.generators import generate_weather_data, generate_sales_data
from app.models.models import Opportunity
import asyncio
import json

class SensingAgent(BaseAgent):
    async def run(self):
        self.logger.info("Sensing Agent started...")
        # In a real system, this would be a continuous loop. 
        # For this demo, we'll run one iteration or be called periodically.
        
        weather = generate_weather_data()
        sales = generate_sales_data("Soup")
        
        self.log_action("Sensed Data", {"weather": weather, "sales": sales})
        
        # Logic: If Rainy and Sales are low (or high potential), trigger opportunity
        if weather["condition"] in ["Rainy", "Snow", "Cold"] or weather["temperature"] < 10:
            description = f"High demand expected for Soup due to {weather['condition']} weather."
            score = 0.85
            
            # Check if similar opportunity exists to avoid duplicates (simplified)
            existing = self.db.query(Opportunity).filter(
                Opportunity.description == description, 
                Opportunity.status == "OPEN"
            ).first()
            
            if not existing:
                opportunity = Opportunity(
                    description=description,
                    score=score,
                    data_source="Weather+Sales",
                    status="OPEN"
                )
                self.db.add(opportunity)
                self.db.commit()
                self.log_action("Opportunity Detected", {"id": opportunity.id, "desc": description})
                return opportunity
        
        return None
