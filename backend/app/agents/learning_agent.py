from app.agents.base import BaseAgent
from app.models.models import Campaign, CampaignStatus, PerformanceLog
import random

class LearningAgent(BaseAgent):
    async def run(self):
        # Find ACTIVE campaigns
        campaigns = self.db.query(Campaign).filter(Campaign.status == CampaignStatus.ACTIVE).all()
        
        for campaign in campaigns:
            self.logger.info(f"Analyzing Performance for: {campaign.name}")
            
            # Simulate Performance Data
            impressions = random.randint(100, 1000)
            clicks = int(impressions * random.uniform(0.01, 0.05))
            conversions = int(clicks * random.uniform(0.1, 0.3))
            spend = clicks * 0.5  # $0.50 CPC
            
            log = PerformanceLog(
                campaign_id=campaign.id,
                impressions=impressions,
                clicks=clicks,
                conversions=conversions,
                spend=spend
            )
            self.db.add(log)
            
            # Check budget
            total_spend = sum([l.spend for l in campaign.performance_logs]) + spend
            if total_spend >= campaign.budget:
                campaign.status = CampaignStatus.COMPLETED
                self.log_action("Campaign Completed", {"campaign_id": campaign.id, "reason": "Budget Exhausted"})
            
            self.db.commit()
            self.log_action("Performance Logged", {"campaign_id": campaign.id, "clicks": clicks})
            return log
            
        return None
