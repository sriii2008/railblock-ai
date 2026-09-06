import os
import sys
import json
from contextlib import asynccontextmanager
from datetime import datetime, timezone

backend_dir = os.path.dirname(os.path.abspath(__file__))
project_root = os.path.dirname(backend_dir)
venv_site_packages = os.path.join(project_root, ".venv", "Lib", "site-packages")
if os.path.exists(venv_site_packages) and venv_site_packages not in sys.path:
    sys.path.insert(0, venv_site_packages)
sys.path.insert(0, backend_dir)

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models import MaintenanceTask, OptimizationWeights, TaskStatus
from database import init_db

init_db()

@asynccontextmanager
async def lifespan(app: FastAPI):
    yield

app = FastAPI(
    title="RailBlock AI - Indian Railways Maintenance Block Planning Optimizer API",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

IN_MEMORY_STATE = {
    "tasks": [],
    "plans": {},
}

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "service": "RailBlock AI Optimizer",
        "tasks_count": len(IN_MEMORY_STATE["tasks"]),
        "timestamp": datetime.now(timezone.utc).isoformat()
    }

@app.get("/api/corridors")
def get_corridors():
    return {
        "corridors": [
            {
                "id": "COR-NDLS-CNB-DN",
                "name": "New Delhi - Kanpur Central (Down)",
                "sections": ["NDLS-GZB", "GZB-ALJN"],
                "base_station": "New Delhi",
                "traffic_density": "HIGH (120+ trains/day)"
            }
        ]
    }

@app.get("/api/data/tasks")
def get_tasks():
    return {"count": len(IN_MEMORY_STATE["tasks"]), "tasks": IN_MEMORY_STATE["tasks"]}

@app.post("/api/plan/weekly")
def generate_weekly_plan(corridor_id: str = "COR-NDLS-CNB-DN"):
    return {
        "plan_id": "PLAN-2026-W37",
        "corridor_id": corridor_id,
        "start_date": "2026-09-08",
        "end_date": "2026-09-14",
        "blocks": [],
        "rejected_tasks": [],
        "metrics": {}
    }

@app.post("/api/plan/monthly")
def generate_monthly_plan(corridor_id: str = "COR-NDLS-CNB-DN"):
    return {
        "plan_id": "PLAN-2026-M09",
        "corridor_id": corridor_id,
        "start_date": "2026-09-01",
        "end_date": "2026-09-30",
        "blocks": [],
        "rejected_tasks": [],
        "metrics": {}
    }