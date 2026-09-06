import os
from sqlalchemy import create_engine, Column, String, Integer, Float, Text
from sqlalchemy.orm import declarative_base, sessionmaker

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./railblock.db")
connect_args = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}

try:
    engine = create_engine(DATABASE_URL, connect_args=connect_args)
except Exception as e:
    print(f"Warning: Failed to create engine: {e}")
    DATABASE_URL = "sqlite:///./railblock.db"
    engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class TaskRecord(Base):
    __tablename__ = "maintenance_tasks"
    task_id = Column(String(64), primary_key=True, index=True)
    source_system = Column(String(32), nullable=False)
    department = Column(String(32), nullable=False)
    location = Column(String(255), nullable=False)
    corridor_id = Column(String(64), index=True, nullable=False)
    track_section_id = Column(String(64), index=True, nullable=False)
    asset_type = Column(String(128), nullable=False)
    defect_description = Column(Text, nullable=False)
    required_duration_minutes = Column(Integer, nullable=False)
    earliest_start_date = Column(String(32), nullable=False)
    latest_completion_date = Column(String(32), nullable=False)
    safety_criticality = Column(Integer, nullable=False)
    status = Column(String(32), default="PENDING")

def init_db():
    global engine, SessionLocal
    try:
        Base.metadata.create_all(bind=engine)
    except Exception as e:
        print(f"Database init warning: {e}")
        engine = create_engine("sqlite:///./railblock.db", connect_args={"check_same_thread": False})
        SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
        Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()