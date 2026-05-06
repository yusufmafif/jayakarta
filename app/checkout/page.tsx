import CheckoutPage from "./CheckoutPage";

export default function Page({ searchParams }) {
  return <CheckoutPage planId={searchParams.plan} />;
}