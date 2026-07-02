import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface AppState {
  isSimulationRunning: boolean;
  currentTick: number;
  setSimulationRunning: (running: boolean) => void;
  setCurrentTick: (tick: number) => void;
}

export const useAppStore = create<AppState>()(
  devtools(
    (set) => ({
      isSimulationRunning: false,
      currentTick: 0,
      setSimulationRunning: (running) => set({ isSimulationRunning: running }),
      setCurrentTick: (tick) => set({ currentTick: tick }),
    }),
    { name: 'app-store' },
  ),
);
