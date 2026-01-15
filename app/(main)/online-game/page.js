import { Suspense } from "react";
import OnlineGamesClient from "@/components/OnlineGamesClient";

export default function OnlineGamesPage() {
  return (
    <Suspense fallback={<div>Loading games...</div>}>
      <OnlineGamesClient />
    </Suspense>
  );
}
