import { NextResponse } from "next/server";

export async function POST(req, res) {
  const body = await req.json();

  const url = `${process.env.EMAIL_SERVICE}/email/newOrder`;

  try {
    await fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
    });
    return NextResponse.json("Sucesso", { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: error.stack }, { status: 500 });
  }
}
