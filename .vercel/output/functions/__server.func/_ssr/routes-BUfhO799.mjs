import { i as __toESM } from "../_runtime.mjs";
import { a as Overlay2, c as Title2, d as require_jsx_runtime, f as require_react, i as Description2, l as Slot, n as Cancel, o as Portal2, r as Content2, s as Root2, t as Action } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { a as ShieldCheck, c as LocateFixed, d as CircleDot, f as ChevronsUp, i as Trash2, l as History, n as Undo2, o as RotateCw, s as RotateCcw, t as Zap, u as Footprints } from "../_libs/lucide-react.mjs";
import { t as format } from "../_libs/date-fns.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { n as persist, r as create, t as createJSONStorage } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BUfhO799.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-[opacity,transform,background-color,color,border-color] duration-[var(--motion-quick)] ease-[var(--ease-out)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-accent text-accent-fg hover:opacity-90 active:scale-[0.98]",
			ghost: "bg-transparent text-fg hover:bg-elevated active:scale-[0.98]",
			outline: "border border-border bg-transparent text-fg hover:bg-elevated active:scale-[0.98]",
			danger: "bg-cat-attack text-fg hover:opacity-90 active:scale-[0.98]"
		},
		size: {
			default: "h-10 px-4 text-sm",
			sm: "h-8 px-3 text-xs",
			lg: "h-12 px-5 text-base",
			icon: "size-10"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, type = "button", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		type: asChild ? void 0 : type,
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
}
function AlertDialog({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root2, { ...props });
}
function AlertDialogPortal({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal2, { ...props });
}
function AlertDialogOverlay({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay2, {
		className: cn("fixed inset-0 z-50 bg-bg/80", className),
		...props
	});
}
function AlertDialogContent({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
		className: cn("fixed top-1/2 left-1/2 z-50 w-[min(100%-2rem,22rem)] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-border bg-surface p-5 shadow-none", className),
		...props
	})] });
}
function AlertDialogHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex flex-col gap-2", className),
		...props
	});
}
function AlertDialogFooter({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className),
		...props
	});
}
function AlertDialogTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title2, {
		className: cn("font-headline text-xl font-semibold tracking-tight text-fg", className),
		...props
	});
}
function AlertDialogDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description2, {
		className: cn("text-sm leading-normal text-muted", className),
		...props
	});
}
function AlertDialogAction({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
		className: cn(buttonVariants({ variant: "default" }), className),
		...props
	});
}
function AlertDialogCancel({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cancel, {
		className: cn(buttonVariants({ variant: "outline" }), className),
		...props
	});
}
var HOLD_MS = 480;
function TallyButton({ category, count, onTick, onUntick }) {
	const timerRef = (0, import_react.useRef)(null);
	const heldRef = (0, import_react.useRef)(false);
	const pressedRef = (0, import_react.useRef)(false);
	const Icon = category.icon;
	const filled = count > 0;
	function clearTimer() {
		if (timerRef.current != null) {
			window.clearTimeout(timerRef.current);
			timerRef.current = null;
		}
	}
	function onPointerDown(event) {
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
	function finish(event) {
		if (!pressedRef.current) return;
		pressedRef.current = false;
		const held = heldRef.current;
		clearTimer();
		if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
		if (!held) onTick();
	}
	function cancel(event) {
		pressedRef.current = false;
		heldRef.current = false;
		clearTimer();
		if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		"data-cat": category.id,
		"data-filled": filled ? "true" : "false",
		"data-wide": category.wide ? "true" : "false",
		className: cn("tally-btn", category.wide && "tally-btn-wide"),
		"aria-label": `${category.name}, ${count} ticks, ${count * category.points} points. ${category.tickWhen}. Tap to add. Hold to subtract.`,
		onPointerDown,
		onPointerUp: finish,
		onPointerCancel: cancel,
		onContextMenu: (event) => event.preventDefault(),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "tally-btn-bar",
			"aria-hidden": "true"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "tally-btn-body",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "tally-btn-copy",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "tally-btn-kicker",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							className: "tally-btn-icon",
							strokeWidth: 2.25,
							"aria-hidden": "true"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "tally-btn-pts",
							children: [category.points, " pts"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "tally-btn-name",
						children: category.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "tally-btn-when",
						children: category.tickWhen
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "tally-btn-count",
				"data-pop": filled ? "true" : "false",
				children: count
			}, count)]
		})]
	});
}
var CATEGORIES = [
	{
		id: "attack",
		name: "Attack the Net",
		points: 3,
		tickWhen: "They're deep or out of position — commit forward",
		icon: ChevronsUp,
		wide: true
	},
	{
		id: "serve",
		name: "Strong 1st Serve",
		points: 2,
		tickWhen: "Full first serve with pace — a fault still counts",
		icon: Zap
	},
	{
		id: "drive",
		name: "Drive w/ Topspin",
		points: 2,
		tickWhen: "Full topspin swing — doesn't have to go in",
		icon: RotateCw
	},
	{
		id: "split",
		name: "Split Step",
		points: 1,
		tickWhen: "Split-step as the opponent makes contact",
		icon: Footprints
	},
	{
		id: "recover",
		name: "Recover",
		points: 1,
		tickWhen: "After the shot, back into ready position",
		icon: LocateFixed
	},
	{
		id: "ready",
		name: "Ball Ready",
		points: 1,
		tickWhen: "Second ball in the pocket before the first serve",
		icon: CircleDot
	},
	{
		id: "respect",
		name: "Respect 2nd Serve",
		points: 1,
		tickWhen: "Leave the missed first serve — ready for the second",
		icon: ShieldCheck
	}
];
var CATEGORY_BY_ID = Object.fromEntries(CATEGORIES.map((category) => [category.id, category]));
function emptyCounts() {
	return {
		attack: 0,
		serve: 0,
		drive: 0,
		split: 0,
		recover: 0,
		ready: 0,
		respect: 0
	};
}
function totalTicks(counts) {
	return CATEGORIES.reduce((sum, category) => sum + counts[category.id], 0);
}
function totalPoints(counts) {
	return CATEGORIES.reduce((sum, category) => sum + counts[category.id] * category.points, 0);
}
function newId() {
	return crypto.randomUUID();
}
function createMatch(number, startedAt = Date.now()) {
	return {
		id: newId(),
		number,
		startedAt,
		endedAt: null,
		counts: emptyCounts(),
		events: []
	};
}
function nextMatchNumber(current, history) {
	return Math.max(current.number, ...history.map((match) => match.number), 0) + 1;
}
function applyDelta(counts, categoryId, delta) {
	const next = Math.max(0, counts[categoryId] + delta);
	return {
		...counts,
		[categoryId]: next
	};
}
function archiveIfNeeded(current, history) {
	if (totalTicks(current.counts) === 0) return history;
	return [{
		...current,
		endedAt: current.endedAt ?? Date.now()
	}, ...history.filter((match) => match.id !== current.id)].slice(0, 24);
}
var noopStorage = {
	getItem: () => null,
	setItem: () => void 0,
	removeItem: () => void 0
};
var useMatchStore = create()(persist((set, get) => ({
	current: createMatch(1),
	history: [],
	hydrated: false,
	setHydrated: (value) => set({ hydrated: value }),
	tick: (categoryId) => {
		set((state) => ({ current: {
			...state.current,
			counts: applyDelta(state.current.counts, categoryId, 1),
			events: [...state.current.events, {
				id: newId(),
				categoryId,
				at: Date.now(),
				delta: 1
			}]
		} }));
		vibrate(12);
	},
	untick: (categoryId) => {
		const { current } = get();
		if (current.counts[categoryId] <= 0) return;
		set({ current: {
			...current,
			counts: applyDelta(current.counts, categoryId, -1),
			events: [...current.events, {
				id: newId(),
				categoryId,
				at: Date.now(),
				delta: -1
			}]
		} });
		vibrate(8);
	},
	undo: () => {
		const { current } = get();
		const last = current.events.at(-1);
		if (!last) return;
		set({ current: {
			...current,
			counts: applyDelta(current.counts, last.categoryId, last.delta === 1 ? -1 : 1),
			events: current.events.slice(0, -1)
		} });
		vibrate(10);
	},
	newMatch: () => {
		const { current, history } = get();
		set({
			history: archiveIfNeeded(current, history),
			current: createMatch(nextMatchNumber(current, history))
		});
	},
	resumeMatch: (id) => {
		const { current, history } = get();
		const target = history.find((match) => match.id === id);
		if (!target) return;
		set({
			history: archiveIfNeeded(current, history.filter((match) => match.id !== id)),
			current: {
				...target,
				endedAt: null
			}
		});
	},
	deleteMatch: (id) => {
		set((state) => ({ history: state.history.filter((match) => match.id !== id) }));
		vibrate(10);
	}
}), {
	name: "process-points-v1",
	skipHydration: true,
	storage: createJSONStorage(() => typeof window === "undefined" ? noopStorage : localStorage),
	partialize: (state) => ({
		current: state.current,
		history: state.history
	})
}));
function vibrate(ms) {
	try {
		navigator.vibrate?.(ms);
	} catch {}
}
function TallyBoard() {
	const current = useMatchStore((state) => state.current);
	const history = useMatchStore((state) => state.history);
	const hydrated = useMatchStore((state) => state.hydrated);
	const tick = useMatchStore((state) => state.tick);
	const untick = useMatchStore((state) => state.untick);
	const undo = useMatchStore((state) => state.undo);
	const newMatch = useMatchStore((state) => state.newMatch);
	const resumeMatch = useMatchStore((state) => state.resumeMatch);
	const deleteMatch = useMatchStore((state) => state.deleteMatch);
	const [ready, setReady] = (0, import_react.useState)(false);
	const [view, setView] = (0, import_react.useState)("tally");
	const [confirmNew, setConfirmNew] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		Promise.resolve(useMatchStore.persist.rehydrate()).finally(() => {
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "tally-shell",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "tally-header",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "tally-header-row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "tally-brand",
							children: "Process Points"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "tally-meta",
							children: ready ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								"Match ",
								current.number,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"aria-hidden": "true",
									children: " · "
								}),
								format(current.startedAt, "EEE h:mm a")
							] }) : "Match"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								className: "size-11 text-muted",
								"aria-label": "Match history",
								onClick: () => setView((v) => v === "history" ? "tally" : "history"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, { className: "size-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								className: "size-11 text-muted",
								"aria-label": "Start a new match",
								onClick: requestNewMatch,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								className: "h-11 gap-1.5 rounded-lg px-3 text-sm",
								"aria-label": "Undo last tick",
								disabled: !last,
								onClick: undo,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Undo2, { className: "size-4" }), "Undo"]
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "tally-score",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "tally-score-value",
							children: ready ? points : 0
						}, points),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "tally-score-label",
							children: "total points"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "tally-last",
							children: ready && last && lastCategory ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								"Last: ",
								lastCategory.name,
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "tally-last-delta",
									children: [last.delta === 1 ? "+" : "−", lastCategory.points]
								})
							] }) : "Tap a habit as it happens · hold to take one back"
						})
					]
				})]
			}),
			view === "tally" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "tally-grid",
				children: CATEGORIES.map((category) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TallyButton, {
					category,
					count: ready ? current.counts[category.id] : 0,
					onTick: () => tick(category.id),
					onUntick: () => untick(category.id)
				}, category.id))
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HistoryPanel, {
				current,
				history,
				hydrated,
				onClose: () => setView("tally"),
				onResume: (id) => {
					resumeMatch(id);
					setView("tally");
				},
				onDelete: deleteMatch
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
				open: confirmNew,
				onOpenChange: setConfirmNew,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: "Start a new match?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogDescription, { children: [
					"Match ",
					current.number,
					" has ",
					points,
					" process points from ",
					ticks,
					" ticks. It will be saved in history so you can reopen it later."
				] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: "Keep going" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
					onClick: () => {
						newMatch();
						setView("tally");
					},
					children: "New match"
				})] })] })
			})
		]
	});
}
function HistoryPanel({ current, history, hydrated, onClose, onResume, onDelete }) {
	const [openId, setOpenId] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "history-panel",
		"aria-label": "Match history",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-baseline justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-headline text-xl font-semibold tracking-tight text-fg",
					children: "History"
				}), history.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "history-hint",
					children: "Swipe left to delete"
				}) : null] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "text-sm font-medium text-accent",
					onClick: onClose,
					children: "Back to tally"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "history-current",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium tracking-wide text-muted uppercase",
					children: "This match"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-headline text-lg font-semibold tracking-tight text-fg",
					children: [
						"Match ",
						current.number,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ml-2 font-headline text-2xl tabular-nums",
							children: totalPoints(current.counts)
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "history-list",
				children: !hydrated ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "history-empty",
					children: "Loading saved matches…"
				}) : history.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "history-empty",
					children: "Finished matches land here when you start a new one."
				}) : history.map((match) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HistorySwipeRow, {
					match,
					open: openId === match.id,
					onOpenChange: (nextOpen) => setOpenId(nextOpen ? match.id : null),
					onResume: () => onResume(match.id),
					onDelete: () => {
						setOpenId((currentId) => currentId === match.id ? null : currentId);
						onDelete(match.id);
					}
				}, match.id))
			})
		]
	});
}
var DRAG_LOCK = 8;
function HistorySwipeRow({ match, open, onOpenChange, onResume, onDelete }) {
	const frontRef = (0, import_react.useRef)(null);
	const startX = (0, import_react.useRef)(0);
	const startY = (0, import_react.useRef)(0);
	const startTx = (0, import_react.useRef)(0);
	const tx = (0, import_react.useRef)(0);
	const axis = (0, import_react.useRef)("undecided");
	const dragging = (0, import_react.useRef)(false);
	const skipClick = (0, import_react.useRef)(false);
	function applyTx(value, animate) {
		tx.current = value;
		const el = frontRef.current;
		if (!el) return;
		const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		el.style.transition = animate && !reduce ? "transform var(--motion-quick) var(--ease-out)" : "none";
		el.style.transform = `translate3d(${value}px,0,0)`;
	}
	(0, import_react.useEffect)(() => {
		applyTx(open ? -88 : 0, true);
	}, [open]);
	function commitDelete() {
		applyTx(-(frontRef.current?.parentElement?.offsetWidth ?? 360), true);
		window.setTimeout(onDelete, 160);
	}
	function onPointerDown(event) {
		if (event.button !== 0) return;
		dragging.current = true;
		axis.current = "undecided";
		skipClick.current = false;
		startX.current = event.clientX;
		startY.current = event.clientY;
		startTx.current = tx.current;
	}
	function onPointerMove(event) {
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
		applyTx(Math.min(0, Math.max(-((frontRef.current?.parentElement?.offsetWidth ?? 360) * .92), startTx.current + dx)), false);
	}
	function onPointerUp(event) {
		if (!dragging.current) return;
		dragging.current = false;
		if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
		if (axis.current !== "h") {
			axis.current = "undecided";
			return;
		}
		skipClick.current = true;
		axis.current = "undecided";
		const width = frontRef.current?.parentElement?.offsetWidth ?? 360;
		const commitAt = Math.min(width * .42, 132);
		if (tx.current <= -commitAt) {
			commitDelete();
			return;
		}
		if (tx.current <= -44) {
			applyTx(-88, true);
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "history-swipe",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			className: "history-swipe-delete",
			"aria-label": `Delete match ${match.number}`,
			onClick: onDelete,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" }), "Delete"]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			ref: frontRef,
			type: "button",
			className: "history-item",
			"aria-label": `Match ${match.number}, ${totalPoints(match.counts)} points. Tap to reopen. Swipe left to delete.`,
			onPointerDown,
			onPointerMove,
			onPointerUp,
			onPointerCancel: onPointerUp,
			onClick: onFrontClick,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "history-item-top",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-headline text-lg font-semibold tracking-tight",
						children: ["Match ", match.number]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-headline text-2xl font-semibold tabular-nums leading-none",
						children: totalPoints(match.counts)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "history-item-meta",
					children: [
						format(match.startedAt, "EEE MMM d · h:mm a"),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"aria-hidden": "true",
							children: " · "
						}),
						totalTicks(match.counts),
						" ticks"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "history-item-cats",
					children: CATEGORIES.filter((category) => match.counts[category.id] > 0).map((category) => `${category.name} ${match.counts[category.id]}`).join("  ·  ") || "No ticks"
				})
			]
		})]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TallyBoard, {}) });
}
//#endregion
export { Home as component };
