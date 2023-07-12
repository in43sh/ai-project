import { NextRequest, NextResponse } from 'next/server';

type Data = {
    name: string
}

export async function GET(
    req: NextRequest,
    res: NextResponse    
) {
    const responseText = "TEST MESSAGE!!!";
    return NextResponse.json({ item: responseText });
}