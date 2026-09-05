import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { format } from "date-fns";
import { History, RotateCcw, Trash2, Undo2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { TallyButton } from "@/components/tally-button";
import {
  CATEGORIES,
  CATEGORY_BY_ID,
  totalPoints,
  totalTicks,
} from "@/lib/categories";
import { useMatchStore, type Match } from "@/lib/match-store";

export function TallyBoard() {
  const current = useMatchStore((state) => state.current);
  const history = useMatchStore((state) => state.history);
  const hydrated = useMatchStore((state) => state.hydrated);
  const tick = useMatchStore((state) => state.tick);
  const untick = useMatchStore((state) => state.untick);
  const undo = useMatchStore((state) => state.undo);
  const newMatch = useMatchStore((state) => state.newMatch);
  const resumeMatch = useMatchStore((state) => state.resumeMatch);
  const deleteMatch = useMatchStore((state) => state.deleteMatch);

  const [ready, setReady] = useState(false);
  const [view, setView] = useState<"tally" | "history">("tally");
  const [confirmNew, setConfirmNew] = useState(false);

  useEffect(() => {
    let cancelled = false;
    void Promise.resolve(useMatchStore.persist.rehydrate()).finally(() => {
      if (cancelled) return;
      useMatchStore.getState().setHydrated(true);
      setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const points = totalPoints(current.counts);
  const ticks = totalTicks(current.counts);
  const last = current.events.at(-1);
  const lastCategory = last ? CATEGORY_BY_ID[last.categoryId] : null;

  function requestNewMatch() {
    if (ticks === 0) {
      newMatch();
      setView("tally");
      return;
    }
    setConfirmNew(true);
  }

  return (
    <div className="tally-shell">
      <header className="tally-header">
        <div className="tally-header-row">
          <div className="min-w-0">
            <p className="tally-brand">Process Points</p>
            <p className="tally-meta">
              {ready ? (
                <>
                  Match {current.number}
                  <span aria-hidden="true"> · </span>
                  {format(current.startedAt, "EEE h:mm a")}
                </>
              ) : (
                "Match"
              )}
            </p>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="size-11 text-muted"
              aria-label="Match history"
              onClick={() => setView((v) => (v === "history" ? "tally" : "history"))}
            >
              <History className="size-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="size-11 text-muted"
              aria-label="Start a new match"
              onClick={requestNewMatch}
            >
              <RotateCcw className="size-5" />
            </Button>
            <Button
              variant="outline"
              className="h-11 gap-1.5 rounded-lg px-3 text-sm"
              aria-label="Undo last tick"
              disabled={!last}
              onClick={undo}
            >
              <Undo2 className="size-4" />
              Undo
            </Button>
          </div>
        </div>

        <div className="tally-score">
          <p className="tally-score-value" key={points}>
            {ready ? points : 0}
          </p>
          <p className="tally-score-label">total points</p>
          <p className="tally-last">
            {ready && last && lastCategory ? (
              <>
                Last: {lastCategory.name}
                <span className="tally-last-delta">
                  {last.delta === 1 ? "+" : "−"}
                  {lastCategory.points}
                </span>
              </>
            ) : (
              "Tap a habit as it happens · hold to take one back"
            )}
          </p>
        </div>
      </header>

      {view === "tally" ? (
        <div className="tally-grid">
          {CATEGORIES.map((category) => (
            <TallyButton
              key={category.id}
              category={category}
              count={ready ? current.counts[category.id] : 0}
              onTick={() => tick(category.id)}
              onUntick={() => untick(category.id)}
            />
          ))}
        </div>
      ) : (
        <HistoryPanel
          current={current}
          history={history}
          hydrated={hydrated}
          onClose={() => setView("tally")}
          onResume={(id) => {
            resumeMatch(id);
            setView("tally");
          }}
          onDelete={deleteMatch}
        />
      )}

      <AlertDialog open={confirmNew} onOpenChange={setConfirmNew}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Start a new match?</AlertDialogTitle>
            <AlertDialogDescription>
              Match {current.number} has {points} process points from {ticks} ticks.
              It will be saved in history so you can reopen it later.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep going</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                newMatch();
                setView("tally");
              }}
            >
              New match
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function HistoryPanel({
  current,
  history,
  hydrated,
  onClose,
  onResume,
  onDelete,
}: {
  current: Match;
  history: Match[];
  hydrated: boolean;
  onClose: () => void;
  onResume: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section className="history-panel" aria-label="Match history">
      <div className="flex items-baseline justify-between gap-3">
        <div>
          <h2 className="font-headline text-xl font-semibold tracking-tight text-fg">
            History
          </h2>
          {history.length > 0 ? (
            <p className="history-hint">Swipe left to delete</p>
          ) : null}
        </div>
        <button
          type="button"
          className="text-sm font-medium text-accent"
          onClick={onClose}
        >
          Back to tally
        </button>
      </div>
      <div className="history-current">
        <p className="text-xs font-medium tracking-wide text-muted uppercase">
          This match
        </p>
        <p className="font-headline text-lg font-semibold tracking-tight text-fg">
          Match {current.number}
          <span className="ml-2 font-headline text-2xl tabular-nums">
            {totalPoints(current.counts)}
          </span>
        </p>
      </div>
      <ul className="history-list">
        {!hydrated ? (
          <li className="history-empty">Loading saved matches…</li>
        ) : history.length === 0 ? (
          <li className="history-empty">
            Finished matches land here when you start a new one.
          </li>
        ) : (
          history.map((match) => (
            <HistorySwipeRow
              key={match.id}
              match={match}
              open={openId === match.id}
              onOpenChange={(nextOpen) => setOpenId(nextOpen ? match.id : null)}
              onResume={() => onResume(match.id)}
              onDelete={() => {
                setOpenId((currentId) => (currentId === match.id ? null : currentId));
                onDelete(match.id);
              }}
            />
          ))
        )}
      </ul>
    </section>
  );
}

const ACTION_W = 88;
const DRAG_LOCK = 8;

function HistorySwipeRow({
  match,
  open,
  onOpenChange,
  onResume,
  onDelete,
}: {
  match: Match;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onResume: () => void;
  onDelete: () => void;
}) {
  const frontRef = useRef<HTMLButtonElement>(null);
  const startX = useRef(0);
  const startY = useRef(0);
  const startTx = useRef(0);
  const tx = useRef(0);
  const axis = useRef<"undecided" | "h" | "v">("undecided");
  const dragging = useRef(false);
  const skipClick = useRef(false);

  function applyTx(value: number, animate: boolean) {
    tx.current = value;
    const el = frontRef.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.style.transition =
      animate && !reduce ? "transform var(--motion-quick) var(--ease-out)" : "none";
    el.style.transform = `translate3d(${value}px,0,0)`;
  }

  useEffect(() => {
    applyTx(open ? -ACTION_W : 0, true);
  }, [open]);

  function commitDelete() {
    const width = frontRef.current?.parentElement?.offsetWidth ?? 360;
    applyTx(-width, true);
    window.setTimeout(onDelete, 160);
  }

  function onPointerDown(event: ReactPointerEvent<HTMLButtonElement>) {
    if (event.button !== 0) return;
    dragging.current = true;
    axis.current = "undecided";
    skipClick.current = false;
    startX.current = event.clientX;
    startY.current = event.clientY;
    startTx.current = tx.current;
  }

  function onPointerMove(event: ReactPointerEvent<HTMLButtonElement>) {
    if (!dragging.current) return;
    const dx = event.clientX - startX.current;
    const dy = event.clientY - startY.current;

    if (axis.current === "undecided") {
      if (Math.abs(dx) < DRAG_LOCK && Math.abs(dy) < DRAG_LOCK) return;
      if (Math.abs(dy) > Math.abs(dx)) {
        axis.current = "v";
        return;
      }
      axis.current = "h";
      event.currentTarget.setPointerCapture(event.pointerId);
    }

    if (axis.current !== "h") return;
    event.preventDefault();
    const next = Math.min(0, Math.max(-((frontRef.current?.parentElement?.offsetWidth ?? 360) * 0.92), startTx.current + dx));
    applyTx(next, false);
  }

  function onPointerUp(event: ReactPointerEvent<HTMLButtonElement>) {
    if (!dragging.current) return;
    dragging.current = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    if (axis.current !== "h") {
      axis.current = "undecided";
      return;
    }

    skipClick.current = true;
    axis.current = "undecided";
    const width = frontRef.current?.parentElement?.offsetWidth ?? 360;
    const commitAt = Math.min(width * 0.42, 132);

    if (tx.current <= -commitAt) {
      commitDelete();
      return;
    }
    if (tx.current <= -ACTION_W / 2) {
      applyTx(-ACTION_W, true);
      onOpenChange(true);
      return;
    }
    applyTx(0, true);
    onOpenChange(false);
  }

  function onFrontClick() {
    if (skipClick.current) {
      skipClick.current = false;
      return;
    }
    if (open) {
      onOpenChange(false);
      return;
    }
    onResume();
  }

  return (
    <li className="history-swipe">
      <button
        type="button"
        className="history-swipe-delete"
        aria-label={`Delete match ${match.number}`}
        onClick={onDelete}
      >
        <Trash2 className="size-4" />
        Delete
      </button>
      <button
        ref={frontRef}
        type="button"
        className="history-item"
        aria-label={`Match ${match.number}, ${totalPoints(match.counts)} points. Tap to reopen. Swipe left to delete.`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onClick={onFrontClick}
      >
        <span className="history-item-top">
          <span className="font-headline text-lg font-semibold tracking-tight">
            Match {match.number}
          </span>
          <span className="font-headline text-2xl font-semibold tabular-nums leading-none">
            {totalPoints(match.counts)}
          </span>
        </span>
        <span className="history-item-meta">
          {format(match.startedAt, "EEE MMM d · h:mm a")}
          <span aria-hidden="true"> · </span>
          {totalTicks(match.counts)} ticks
        </span>
        <span className="history-item-cats">
          {CATEGORIES.filter((category) => match.counts[category.id] > 0)
            .map((category) => `${category.name} ${match.counts[category.id]}`)
            .join("  ·  ") || "No ticks"}
        </span>
      </button>
    </li>
  );
}
