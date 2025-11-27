from abc import ABC, abstractmethod
import logging
from sqlalchemy.orm import Session

class BaseAgent(ABC):
    def __init__(self, db: Session):
        self.db = db
        self.logger = logging.getLogger(self.__class__.__name__)

    @abstractmethod
    async def run(self):
        """Main execution loop for the agent."""
        pass

    def log_action(self, action: str, details: dict):
        from app.models.models import AgentLog
        log_entry = AgentLog(
            agent_name=self.__class__.__name__,
            action=action,
            details=details
        )
        self.db.add(log_entry)
        self.db.commit()
        self.logger.info(f"Action: {action} | Details: {details}")
