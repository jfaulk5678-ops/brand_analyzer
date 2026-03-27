import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { brand, competitor } = await request.json();
  const apiKey = process.env.OPENROUTER_API_KEY!;

  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'nvidia/nemotron-3-nano-30b-a3b',
      messages: [{ role: 'user', content: `Compare ${brand} vs ${competitor} brand visibility in AI search. Table format.` }]
    })
  });

  const data = await res.json();
  return NextResponse.json({ report: data.choices[0].message.content });
}