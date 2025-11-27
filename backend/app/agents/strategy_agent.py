from app.agents.base import BaseAgent
from app.models.models import Opportunity, Campaign, CampaignStatus
import json

class StrategyAgent(BaseAgent):
    async def run(self):
        # Find open opportunities
        opportunity = self.db.query(Opportunity).filter(Opportunity.status == "OPEN").first()
        
        if opportunity:
            self.logger.info(f"Processing Opportunity: {opportunity.description}")
            
            # Formulate Strategy (Mock Logic)
            budget = 1000.0 * opportunity.score
            target_audience = {"demographic": "Families", "location": "UK", "interest": "Comfort Food"}
            strategy_details = {
                "rationale": f"Capitalizing on {opportunity.data_source} signal.",
                "expected_roi": 2.5
            }
            
            # Create Campaign
            campaign = Campaign(
                name=f"Auto-Campaign: {opportunity.description[:30]}...",
                status=CampaignStatus.PLANNED,
                budget=budget,
                target_audience=target_audience,
                strategy_details=strategy_details
            )
            self.db.add(campaign)
            
            # Close Opportunity
            opportunity.status = "PROCESSED"
            self.db.commit()
            
            self.log_action("Campaign Planned", {"campaign_id": campaign.id, "budget": budget})
            return campaign
            
        return None
