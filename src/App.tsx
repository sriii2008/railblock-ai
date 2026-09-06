import React, { useState, useEffect, useCallback } from 'react';
import { CorridorInfo, OptimizationPlan, MaintenanceTask } from './types';
import { fetchCorridors, fetchTasks, generateWeeklyPlan } from './services/api';
import { FALLBACK_CORRIDORS, FALLBACK_PLAN, FALLBACK_TASKS } from './data/railwayData';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [corridors, setCorridors] = useState<CorridorInfo[]>(FALLBACK_CORRIDORS);
  const [selectedCorridorId, setSelectedCorridorId] = useState('COR-NDLS-CNB-DN');
  const [weeklyPlan, setWeeklyPlan] = useState<OptimizationPlan | null>(FALLBACK_PLAN);
  const [tasks, setTasks] = useState<MaintenanceTask[]>(FALLBACK_TASKS);
  const [isOptimizing, setIsOptimizing] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function loadInitialData() {
      try {
        const corrRes = await fetchCorridors();
        if (isMounted && corrRes?.corridors?.length) {
          setCorridors(corrRes.corridors);
        }
      } catch (e) {
        console.log('Using fallback corridors');
      }
      try {
        const tasksRes = await fetchTasks();
        if (isMounted && tasksRes?.tasks?.length) {
          setTasks(tasksRes.tasks);
        }
      } catch (e) {
        console.log('Using fallback tasks');
      }
    }
    loadInitialData();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleRunOptimizer = useCallback(async () => {
    setIsOptimizing(true);
    try {
      const plan = await generateWeeklyPlan(undefined, selectedCorridorId);
      setWeeklyPlan(plan);
    } catch (err: any) {
      console.error('Optimization failed', err.message);
    } finally {
      setIsOptimizing(false);
    }
  }, [selectedCorridorId]);

  return (
    <div className="min-h-screen bg-pastel-dream flex font-sans text-slate-900">
      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-white/60 backdrop-blur-2xl border-b border-white/80 px-6 flex items-center justify-between">
          <h1 className="text-xl font-bold text-[#6754E9]">RailBlock AI</h1>
          <button onClick={handleRunOptimizer} disabled={isOptimizing} className="px-4 py-2 bg-[#6754E9] text-white rounded-lg">
            {isOptimizing ? 'Optimizing...' : 'Run Optimizer'}
          </button>
        </header>
        <main className="flex-1 p-6">
          <h2>Welcome to RailBlock AI</h2>
          <p>Railway Maintenance Block Planning Optimizer</p>
          {weeklyPlan && <div>{weeklyPlan.blocks?.length} blocks scheduled</div>}
        </main>
      </div>
    </div>
  );
}