from app.agents.base import BaseAgent
from app.models.models import Campaign, CampaignStatus

class BookingAgent(BaseAgent):
    async def run(self):
        # Find PLANNED campaigns that have creatives
        campaigns = self.db.query(Campaign).filter(Campaign.status == CampaignStatus.PLANNED).all()
        
        for campaign in campaigns:
            if campaign.creatives:
                self.logger.info(f"Booking Campaign: {campaign.name}")
                
                # Mock API Call to Ad Platform
                # response = requests.post("https://ad-platform.com/api/book", json=...)
                booking_id = f"BOOK-{campaign.id[:8]}"
                
                campaign.status = CampaignStatus.ACTIVE
                self.db.commit()
                
                self.log_action("Campaign Booked", {"campaign_id": campaign.id, "booking_ref": booking_id})
                return campaign
        
        return None
