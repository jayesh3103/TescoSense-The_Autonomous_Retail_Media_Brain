from app.agents.base import BaseAgent
from app.models.models import Campaign, Creative, CampaignStatus
import random

class CreativeAgent(BaseAgent):
    async def run(self):
        # Find campaigns that need creatives (PLANNED status and no creatives)
        # Simplified: Just pick one PLANNED campaign
        campaign = self.db.query(Campaign).filter(Campaign.status == CampaignStatus.PLANNED).first()
        
        if campaign:
            # Check if it already has creatives
            if not campaign.creatives:
                self.logger.info(f"Generating Creatives for Campaign: {campaign.name}")
                
                # Mock GenAI
                headlines = [
                    "Warm up with our delicious soups!",
                    "Rainy days call for hot soup.",
                    "Comfort in a bowl, ready in minutes."
                ]
                images = [
                    "https://placehold.co/600x400?text=Hot+Soup",
                    "https://placehold.co/600x400?text=Cozy+Dinner",
                    "https://placehold.co/600x400?text=Family+Meal"
                ]
                
                creative = Creative(
                    campaign_id=campaign.id,
                    headline=random.choice(headlines),
                    ad_copy="Buy 1 Get 1 Free on all organic soups this weekend.",
                    image_url=random.choice(images),
                    asset_type="banner"
                )
                self.db.add(creative)
                self.db.commit()
                
                self.log_action("Creatives Generated", {"campaign_id": campaign.id, "creative_id": creative.id})
                return creative
        
        return None
