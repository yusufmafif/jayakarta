import CheckoutPage from "./CheckoutPage";

export default function Page({
  searchParams,
}: {
  searchParams: { plan?: string };
}) {
  return <CheckoutPage planId={searchParams.plan} />;
}