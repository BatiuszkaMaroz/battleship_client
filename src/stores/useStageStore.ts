import { create } from 'zustand';

export enum Stage {
  HOME,
  LOBBY,
  GAME,
}

interface StageState {
  stage: Stage;
  setStage: (nextStage: Stage) => void;
}

export const useStageStore = create<StageState>()((set) => ({
  stage: Stage.HOME,
  // stage: Stage.LOBBY,
  setStage: (nextStage: Stage) => set(() => ({ stage: nextStage })),
}));
