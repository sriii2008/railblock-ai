# RailBlock AI Development Guide

## Project Structure

```
railblock-ai/
├── backend/                 # FastAPI Python backend
│   ├── main.py             # FastAPI application
│   ├── models.py           # Pydantic models
│   ├── database.py         # SQLAlchemy ORM
│   ├── optimizer.py        # CP-SAT solver
│   ├── scoring.py          # Priority scoring
│   ├── synthetic_data.py   # Test data
│   ├── Dockerfile          # Backend container
│   └── requirements.txt    # Python dependencies
├── src/                    # React TypeScript frontend
│   ├── App.tsx            # Main component
│   ├── types.ts           # TypeScript interfaces
│   ├── index.css          # Tailwind styles
│   ├── main.tsx           # Entry point
│   ├── services/          # API calls
│   ├── components/        # React components
│   └── data/              # Mock data
├── docker-compose.yml     # Docker Compose configuration
├── Dockerfile.frontend    # Frontend container
├── vite.config.ts        # Vite configuration
├── tsconfig.json         # TypeScript config
└── package.json          # Node dependencies
```

## Getting Started

### Option 1: Docker Compose (Recommended)
```bash
docker-compose up
```

Then visit:
- Frontend: http://localhost:3000
- API Docs: http://localhost:8000/docs

### Option 2: Local Development

**Backend:**
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

**Frontend:**
```bash
npm install
npm run dev
```

## Technology Stack

- **Backend**: FastAPI + Python 3.11
- **Optimization**: Google OR-Tools CP-SAT
- **Database**: PostgreSQL 15 (optional, falls back to SQLite)
- **Frontend**: React 19 + TypeScript + Tailwind CSS
- **Build Tool**: Vite
- **Deployment**: Docker Compose
