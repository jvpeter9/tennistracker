import {
  ChevronsUp,
  CircleDot,
  Footprints,
  LocateFixed,
  RotateCw,
  ShieldCheck,
  Zap,
  type LucideIcon,
} from "lucide-react";

export type CategoryId =
  | "attack"
  | "serve"
  | "drive"
  | "split"
  | "recover"
  | "ready"
  | "respect";

export type Category = {
  id: CategoryId;
  name: string;
  points: 1 | 2 | 3;
  tickWhen: string;
  icon: LucideIcon;
  wide?: boolean;
};

export const CATEGORIES: readonly Category[] = [
  {
    id: "attack",
    name: "Attack the Net",
    points: 3,
    tickWhen: "They're deep or out of position — commit forward",
    icon: ChevronsUp,
    wide: true,
  },
  {
    id: "serve",
    name: "Strong 1st Serve",
    points: 2,
    tickWhen: "Full first serve with pace — a fault still counts",
    icon: Zap,
  },
  {
    id: "drive",
    name: "Drive w/ Topspin",
    points: 2,
    tickWhen: "Full topspin swing — doesn't have to go in",
    icon: RotateCw,
  },
  {
    id: "split",
    name: "Split Step",
    points: 1,
    tickWhen: "Split-step as the opponent makes contact",
    icon: Footprints,
  },
  {
    id: "recover",
    name: "Recover",
    points: 1,
    tickWhen: "After the shot, back into ready position",
    icon: LocateFixed,
  },
  {
    id: "ready",
    name: "Ball Ready",
    points: 1,
    tickWhen: "Second ball in the pocket before the first serve",
    icon: CircleDot,
  },
  {
    id: "respect",
    name: "Respect 2nd Serve",
    points: 1,
    tickWhen: "Leave the missed first serve — ready for the second",
    icon: ShieldCheck,
  },
] as const;

export const CATEGORY_BY_ID: Record<CategoryId, Category> = Object.fromEntries(
  CATEGORIES.map((category) => [category.id, category]),
) as Record<CategoryId, Category>;

export type Counts = Record<CategoryId, number>;

export function emptyCounts(): Counts {
  return {
    attack: 0,
    serve: 0,
    drive: 0,
    split: 0,
    recover: 0,
    ready: 0,
    respect: 0,
  };
}

export function totalTicks(counts: Counts): number {
  return CATEGORIES.reduce((sum, category) => sum + counts[category.id], 0);
}

export function totalPoints(counts: Counts): number {
  return CATEGORIES.reduce(
    (sum, category) => sum + counts[category.id] * category.points,
    0,
  );
}
