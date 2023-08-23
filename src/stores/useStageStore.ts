import { create } from 'zustand';

export enum Stage {
  HOME,
  MATCHMAKING,
  GAME,
}

interface StageState {
  stage: Stage;
  setStage: (nextStage: Stage) => void;
}

export const useStageStore = create<StageState>()((set) => ({
  stage: Stage.HOME,
  setStage: (nextStage: Stage) => set(() => ({ stage: nextStage })),
}));
