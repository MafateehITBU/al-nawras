import { NextResponse } from "next/server";

const TILE_HOSTS = ["a", "b", "c"] as const;

export async function GET(
  _request: Request,
  context: { params: Promise<{ z: string; x: string; y: string }> },
) {
  const { z, x, y } = await context.params;

  if (!/^\d+$/.test(z) || !/^\d+$/.test(x) || !/^\d+$/.test(y)) {
    return NextResponse.json({ error: "Invalid tile coordinates" }, { status: 400 });
  }

  const host = TILE_HOSTS[(Number(x) + Number(y)) % TILE_HOSTS.length];
  const tileUrl = `https://${host}.tile.openstreetmap.org/${z}/${x}/${y}.png`;

  try {
    const response = await fetch(tileUrl, {
      headers: {
        "User-Agent": "AlNawras/1.0 (https://alnawras.com; contact@alnawras.com)",
      },
      next: { revalidate: 60 * 60 * 24 },
    });

    if (!response.ok) {
      return new NextResponse(null, { status: response.status });
    }

    const body = await response.arrayBuffer();

    return new NextResponse(body, {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
      },
    });
  } catch {
    return new NextResponse(null, { status: 502 });
  }
}
