import Midtrans from "midtrans-client"
import { NextResponse } from 'next/server';

let snap = new Midtrans.Snap({
  isProduction: process.env.ENVIRONMENT === "production",
  serverKey: process.env.SECRET,
  clientKey: process.env.NEXT_PUBLIC_CLIENT,
})

export async function POST(request) {
  try {
    const { id, productName, price, quantity } = await request.json()

    const origin =
      request.headers.get('origin') || 'http://localhost:3000';

    let parameter = {
      item_details: [
        {
          name: productName,
          price: price,
          quantity: quantity
        }
      ],
      transaction_details: {
        order_id: id,
        gross_amount: price * quantity
      },
      callbacks: {
        finish: `${origin}/thanks`,
        error: `${origin}/`,
        pending: `${origin}/`
      }
    }

    const token = await snap.createTransactionToken(parameter)

    return NextResponse.json({ token })

  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    )
  }
}