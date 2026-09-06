import { CorridorInfo, OptimizationPlan, MaintenanceTask } from '../types';
export const FALLBACK_CORRIDORS: CorridorInfo[] = [
  {
    id: 'COR-NDLS-CNB-DN',
    name: 'New Delhi - Kanpur Central (Down Line)',
    sections: ['NDLS-GZB', 'GZB-ALJN', 'ALJN-TDL', 'TDL-ETW', 'ETW-CNB'],
    base_station: 'New Delhi',
    traffic_density: 'HIGH (120+ trains/day)',
  },
];
export const FALLBACK_TASKS: MaintenanceTask[] = [];
export const FALLBACK_PLAN: OptimizationPlan = {
  plan_id: 'PLAN-2026-W37',
  corridor_id: 'COR-NDLS-CNB-DN',
  start_date: '2026-09-08',
  end_date: '2026-09-14',
  blocks: [],
  rejected_tasks: [],
  metrics: {}
};