import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { brand, competitor, type } = body;
    
    // Mock AI (add OpenRouter later)
    const report = `AI Analysis for ${brand}: Market leader. ${competitor ? `Beats ${competitor}.` : ''} ${type ? type : 'Strong metrics'}. Score: ${Math.floor(Math.random() * 20 + 80)}/100`;
    
    return NextResponse.json({ report });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}