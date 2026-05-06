import CheckoutPage from "./CheckoutPage";

export default function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  return <CheckoutPage planId={searchParams?.plan as string} />;
}