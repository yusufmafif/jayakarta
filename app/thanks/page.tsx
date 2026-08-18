import ThanksPage from "./ThanksPage";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense>
      <ThanksPage />
    </Suspense>
  );
}
