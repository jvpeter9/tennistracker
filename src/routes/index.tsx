import { createFileRoute } from "@tanstack/react-router";
import { TallyBoard } from "@/components/tally-board";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <main>
      <TallyBoard />
    </main>
  );
}
