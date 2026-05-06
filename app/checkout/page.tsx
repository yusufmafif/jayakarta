import CheckoutPage from "./CheckoutPage";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense>
      <CheckoutPage />
    </Suspense>
  );
}
