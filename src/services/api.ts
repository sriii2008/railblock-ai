import {
  MaintenanceTask,
  OptimizationPlan,
  OptimizationWeights,
  CorridorInfo,
  SourceSystem
} from '../types';

const API_BASE = '/api';

export async function fetchCorridors(): Promise<{ corridors: CorridorInfo[] }> {
  const res = await fetch(`${API_BASE}/corridors`);
  if (!res.ok) throw new Error('Failed to fetch corridors');
  return res.json();
}

export async function fetchTasks(): Promise<{ count: number; tasks: MaintenanceTask[] }> {
  const res = await fetch(`${API_BASE}/data/tasks`);
  if (!res.ok) throw new Error('Failed to fetch tasks');
  return res.json();
}

export async function generateWeeklyPlan(
  weights?: OptimizationWeights,
  corridorId = 'COR-NDLS-CNB-DN'
): Promise<OptimizationPlan> {
  const res = await fetch(`${API_BASE}/plan/weekly?corridor_id=${corridorId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: weights ? JSON.stringify(weights) : undefined,
  });
  if (!res.ok) throw new Error('Failed to generate weekly plan');
  return res.json();
}

export async function generateMonthlyPlan(
  weights?: OptimizationWeights,
  corridorId = 'COR-NDLS-CNB-DN'
): Promise<OptimizationPlan> {
  const res = await fetch(`${API_BASE}/plan/monthly?corridor_id=${corridorId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: weights ? JSON.stringify(weights) : undefined,
  });
  if (!res.ok) throw new Error('Failed to generate monthly plan');
  return res.json();
}

export async function generateSyntheticData(corridorId: string): Promise<any> {
  const res = await fetch(`${API_BASE}/data/generate-synthetic?corridor_id=${corridorId}`, { method: 'POST' });
  if (!res.ok) throw new Error('Failed to generate synthetic data');
  return res.json();
}

export async function runWhatIfAnalysis(
  weights: OptimizationWeights,
  corridorId: string
): Promise<OptimizationPlan> {
  const res = await fetch(`${API_BASE}/plan/what-if?corridor_id=${corridorId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(weights),
  });
  if (!res.ok) throw new Error('What-If analysis failed');
  return res.json();
}