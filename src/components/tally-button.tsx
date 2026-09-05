import { useRef, type PointerEvent } from "react";
import type { Category } from "@/lib/categories";
import { cn } from "@/lib/utils";

const HOLD_MS = 480;

type TallyButtonProps = {
  category: Category;
  count: number;
  onTick: () => void;
  onUntick: () => void;
};

export function TallyButton({
  category,
  count,
  onTick,
  onUntick,
}: TallyButtonProps) {
  const timerRef = useRef<number | null>(null);
  const heldRef = useRef(false);
  const pressedRef = useRef(false);
  const Icon = category.icon;
  const filled = count > 0;

  function clearTimer() {
    if (timerRef.current != null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }

  function onPointerDown(event: PointerEvent<HTMLButtonElement>) {
    if (event.button !== 0) return;
    pressedRef.current = true;
    heldRef.current = false;
    clearTimer();
    event.currentTarget.setPointerCapture(event.pointerId);
    timerRef.current = window.setTimeout(() => {
      heldRef.current = true;
      onUntick();
    }, HOLD_MS);
  }

  function finish(event: PointerEvent<HTMLButtonElement>) {
    if (!pressedRef.current) return;
    pressedRef.current = false;
    const held = heldRef.current;
    clearTimer();
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    if (!held) onTick();
  }

  function cancel(event: PointerEvent<HTMLButtonElement>) {
    pressedRef.current = false;
    heldRef.current = false;
    clearTimer();
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  return (
    <button
      type="button"
      data-cat={category.id}
      data-filled={filled ? "true" : "false"}
      data-wide={category.wide ? "true" : "false"}
      className={cn("tally-btn", category.wide && "tally-btn-wide")}
      aria-label={`${category.name}, ${count} ticks, ${count * category.points} points. ${category.tickWhen}. Tap to add. Hold to subtract.`}
      onPointerDown={onPointerDown}
      onPointerUp={finish}
      onPointerCancel={cancel}
      onContextMenu={(event) => event.preventDefault()}
    >
      <span className="tally-btn-bar" aria-hidden="true" />
      <span className="tally-btn-body">
        <span className="tally-btn-copy">
          <span className="tally-btn-kicker">
            <Icon className="tally-btn-icon" strokeWidth={2.25} aria-hidden="true" />
            <span className="tally-btn-pts">{category.points} pts</span>
          </span>
          <span className="tally-btn-name">{category.name}</span>
          <span className="tally-btn-when">{category.tickWhen}</span>
        </span>
        <span className="tally-btn-count" key={count} data-pop={filled ? "true" : "false"}>
          {count}
        </span>
      </span>
    </button>
  );
}
