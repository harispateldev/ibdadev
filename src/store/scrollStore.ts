import { create } from 'zustand';

interface ScrollState {
  progress: number;
  direction: 'up' | 'down';
  velocity: number;
  isScrolling: boolean;
  activeSection: number;
  setProgress: (progress: number) => void;
  setDirection: (direction: 'up' | 'down') => void;
  setVelocity: (velocity: number) => void;
  setIsScrolling: (isScrolling: boolean) => void;
  setActiveSection: (index: number) => void;
}

export const useScrollStore = create<ScrollState>((set) => ({
  progress: 0,
  direction: 'down',
  velocity: 0,
  isScrolling: false,
  activeSection: 0,
  setProgress: (progress) => set({ progress }),
  setDirection: (direction) => set({ direction }),
  setVelocity: (velocity) => set({ velocity }),
  setIsScrolling: (isScrolling) => set({ isScrolling }),
  setActiveSection: (index) => set({ activeSection: index }),
}));
