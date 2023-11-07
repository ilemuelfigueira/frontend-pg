import { render } from "@react-email/render";
import nodemailer from "nodemailer";
import { Email } from "@/components/email/criar-pedido";
import { NextResponse } from "next/server";

import { writeFileSync } from "fs";

export async function POST(req, res) {
  // const body = await req.json();

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const emailHtml = render(Email());

  writeFileSync("criar-pedido.html", emailHtml);

  // const options = {
  //   from: process.env.ENVELOPE_FROM,
  //   to: "lfigueiradev@gmail.com; xanderzinho26@gmail.com",
  //   subject: "AIIIIIIIIII MINHA ##$$@!",
  //   html: emailHtml,
  // };

  // await transporter.sendMail(options);

  return NextResponse.json(emailHtml, { status: 200 });
}
