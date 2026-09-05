import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import {
  emptyCounts,
  totalTicks,
  type CategoryId,
  type Counts,
} from "@/lib/categories";

export type TallyEvent = {
  id: string;
  categoryId: CategoryId;
  at: number;
  delta: 1 | -1;
};

export type Match = {
  id: string;
  number: number;
  startedAt: number;
  endedAt: number | null;
  counts: Counts;
  events: TallyEvent[];
};

type MatchState = {
  current: Match;
  history: Match[];
  hydrated: boolean;
  setHydrated: (value: boolean) => void;
  tick: (categoryId: CategoryId) => void;
  untick: (categoryId: CategoryId) => void;
  undo: () => void;
  newMatch: () => void;
  resumeMatch: (id: string) => void;
  deleteMatch: (id: string) => void;
};

function newId(): string {
  return crypto.randomUUID();
}

function createMatch(number: number, startedAt = Date.now()): Match {
  return {
    id: newId(),
    number,
    startedAt,
    endedAt: null,
    counts: emptyCounts(),
    events: [],
  };
}

function nextMatchNumber(current: Match, history: Match[]): number {
  const max = Math.max(current.number, ...history.map((match) => match.number), 0);
  return max + 1;
}

function applyDelta(counts: Counts, categoryId: CategoryId, delta: 1 | -1): Counts {
  const next = Math.max(0, counts[categoryId] + delta);
  return { ...counts, [categoryId]: next };
}

function archiveIfNeeded(current: Match, history: Match[]): Match[] {
  if (totalTicks(current.counts) === 0) return history;
  const archived: Match = { ...current, endedAt: current.endedAt ?? Date.now() };
  return [archived, ...history.filter((match) => match.id !== current.id)].slice(0, 24);
}

const noopStorage = {
  getItem: () => null,
  setItem: () => undefined,
  removeItem: () => undefined,
};

export const useMatchStore = create<MatchState>()(
  persist(
    (set, get) => ({
      current: createMatch(1),
      history: [],
      hydrated: false,
      setHydrated: (value) => set({ hydrated: value }),
      tick: (categoryId) => {
        set((state) => ({
          current: {
            ...state.current,
            counts: applyDelta(state.current.counts, categoryId, 1),
            events: [
              ...state.current.events,
              { id: newId(), categoryId, at: Date.now(), delta: 1 },
            ],
          },
        }));
        vibrate(12);
      },
      untick: (categoryId) => {
        const { current } = get();
        if (current.counts[categoryId] <= 0) return;
        set({
          current: {
            ...current,
            counts: applyDelta(current.counts, categoryId, -1),
            events: [
              ...current.events,
              { id: newId(), categoryId, at: Date.now(), delta: -1 },
            ],
          },
        });
        vibrate(8);
      },
      undo: () => {
        const { current } = get();
        const last = current.events.at(-1);
        if (!last) return;
        set({
          current: {
            ...current,
            counts: applyDelta(current.counts, last.categoryId, last.delta === 1 ? -1 : 1),
            events: current.events.slice(0, -1),
          },
        });
        vibrate(10);
      },
      newMatch: () => {
        const { current, history } = get();
        set({
          history: archiveIfNeeded(current, history),
          current: createMatch(nextMatchNumber(current, history)),
        });
      },
      resumeMatch: (id) => {
        const { current, history } = get();
        const target = history.find((match) => match.id === id);
        if (!target) return;
        const remaining = history.filter((match) => match.id !== id);
        set({
          history: archiveIfNeeded(current, remaining),
          current: { ...target, endedAt: null },
        });
      },
      deleteMatch: (id) => {
        set((state) => ({
          history: state.history.filter((match) => match.id !== id),
        }));
        vibrate(10);
      },
    }),
    {
      name: "process-points-v1",
      skipHydration: true,
      storage: createJSONStorage(() =>
        typeof window === "undefined" ? noopStorage : localStorage,
      ),
      partialize: (state) => ({
        current: state.current,
        history: state.history,
      }),
    },
  ),
);

function vibrate(ms: number) {
  try {
    navigator.vibrate?.(ms);
  } catch {
    /* ignore */
  }
}
