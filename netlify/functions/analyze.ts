export default async function handler(req: Request): Promise<Response> {
  try {
    const body = await req.json();
    const { brand, competitor, type } = body;
    
    // Mock OpenRouter response (replace with real API)
    const report = `AI Analysis for ${brand}: Strong ${type || 'brand'} presence. Competitor ${competitor || 'N/A'}: Similar traffic. Recommendations: Optimize SEO.`;
    
    return new Response(JSON.stringify({ report }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'API failed' }), { status: 500 });
  }
}