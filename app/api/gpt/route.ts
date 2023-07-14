
import { NextRequest, NextResponse } from 'next/server';
import openai from "@/app/_utils/openai";

export async function POST(req: NextRequest, res: NextResponse) {
// export async function POST(req: NextRequest) {
  console.log("hello");

  const body = await req.json();
  console.log("body ===> ", body);

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: body.messages
  })
  const responseText = completion.data.choices[0].message.content;
  return NextResponse.json({ item: responseText });
}


// export async function GET(req: NextRequest) {
//   console.log("hello");
//   const responseText = "HERE"
//   return NextResponse.json({ item: responseText });
// }
