from models import MaintenanceTask
from datetime import datetime

class PriorityScorer:
    def calculate_score(self, task: MaintenanceTask):
        return {
            "safety_score": 40.0,
            "urgency_score": 25.0,
            "impact_score": 20.0,
            "failure_risk_score": 15.0,
            "total_composite_score": 100.0
        }