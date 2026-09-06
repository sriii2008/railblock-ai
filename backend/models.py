from typing import List, Optional
from pydantic import BaseModel, Field
from enum import Enum

class SourceSystem(str, Enum):
    TMS = "TMS"
    SMMS = "SMMS"
    TDMS = "TDMS"
    BDMS = "BDMS"
    COA = "COA"

class Department(str, Enum):
    ENGINEERING = "ENGINEERING"
    TRD = "TRD"
    SNT = "S&T"

class TaskStatus(str, Enum):
    PENDING = "PENDING"
    SCHEDULED = "SCHEDULED"
    REJECTED = "REJECTED"

class MaintenanceTask(BaseModel):
    task_id: str
    source_system: SourceSystem
    department: Department
    location: str
    corridor_id: str
    track_section_id: str
    asset_type: str
    defect_description: str
    required_duration_minutes: int
    earliest_start_date: str
    latest_completion_date: str
    safety_criticality: int = Field(..., ge=1, le=5)
    status: TaskStatus = TaskStatus.PENDING

class OptimizationWeights(BaseModel):
    asset_availability: float = Field(default=0.40, ge=0.0, le=1.0)
    safety_critical: float = Field(default=0.25, ge=0.0, le=1.0)
    block_utilization: float = Field(default=0.20, ge=0.0, le=1.0)
    departmental_coordination: float = Field(default=0.10, ge=0.0, le=1.0)
    train_disruption_penalty: float = Field(default=0.05, ge=0.0, le=1.0)