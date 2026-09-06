export type SourceSystem = 'TMS' | 'SMMS' | 'TDMS' | 'BDMS' | 'COA';
export type Department = 'ENGINEERING' | 'TRD' | 'S&T';
export type TaskStatus = 'PENDING' | 'SCHEDULED' | 'REJECTED' | 'DEFERRED' | 'COMPLETED';
export interface PriorityBreakdown {
  safety_score: number;
  urgency_score: number;
  impact_score: number;
  failure_risk_score: number;
  total_composite_score: number;
}
export interface MaintenanceTask {
  task_id: string;
  source_system: SourceSystem;
  department: Department;
  location: string;
  corridor_id: string;
  track_section_id: string;
  asset_type: string;
  defect_description: string;
  required_duration_minutes: number;
  earliest_start_date: string;
  latest_completion_date: string;
  safety_criticality: number;
  required_resources: string[];
  dependencies: string[];
  status: TaskStatus;
  rejection_reason?: string | null;
  scheduled_start?: string | null;
  scheduled_end?: string | null;
  scheduled_block_id?: string | null;
  priority_score?: number | null;
  priority_breakdown?: PriorityBreakdown | null;
}
export interface TimeWindow {
  window_id: string;
  start_time: string;
  end_time: string;
  duration_minutes: number;
}
export interface TrainConflict {
  train_no: string;
  train_name: string;
  train_type: string;
  blocked_start: string;
  blocked_end: string;
  track_section_id: string;
}
export interface CorridorInfo {
  id: string;
  name: string;
  sections: string[];
  base_station: string;
  traffic_density: string;
}
export interface CoordinatedBlock {
  block_id: string;
  corridor_id: string;
  date: string;
  start_time: string;
  end_time: string;
  total_duration_minutes: number;
  tasks: MaintenanceTask[];
  departments: string[];
  task_count: number;
  is_bundled: boolean;
  hours_saved: number;
  track_sections: string[];
  status: string;
}
export interface OptimizationPlan {
  plan_id: string;
  corridor_id: string;
  start_date: string;
  end_date: string;
  blocks: CoordinatedBlock[];
  rejected_tasks: MaintenanceTask[];
  metrics: any;
}
export interface OptimizationWeights {
  asset_availability: number;
  safety_critical: number;
  block_utilization: number;
  departmental_coordination: number;
  train_disruption_penalty: number;
}