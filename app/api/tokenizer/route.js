import Midtrans from "midtrans-client"
import { NextResponse } from 'next/server';

let snap = new Midtrans.Snap({
  isProduction: true,
  serverKey: process.env.SECRET,
  clientKey: process.env.NEXT_PUBLIC_CLIENT,
})

export async function POST(request) {
  const { id, productName, price, quantity } = await request.json()

  // 1. Ambil URL Dev Tunnels yang sedang aktif secara otomatis dari browser
  const origin = request.headers.get('origin') || 'http://localhost:3000';

  let parameter = {
    item_details: {
        name: productName,
        price: price,
        quantity: quantity
    },
    transaction_details: {
        order_id: id,
        gross_amount: price * quantity
    },
    // 2. Tambahkan callbacks di bawah ini agar menimpa pengaturan dashboard
    callbacks: {
      finish: `${origin}/thanks`,      // Halaman tujuan jika sukses (misal kembali ke beranda)
      error: `${origin}/`,       // Halaman jika gagal
      pending: `${origin}/`      // Halaman jika pending
    }
  } 

  const token = await snap.createTransactionToken(parameter)
  // console.log(token)
  return NextResponse.json({ token })
}
