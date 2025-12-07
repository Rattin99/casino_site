import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { type } = params;
  const url = new URL(request.url);
  const page = url.searchParams.get("page") || "1";
  const limit = url.searchParams.get("limit") || "10";
  const country = url.searchParams.get("country") || "us";

  const validTypes = ["casino", "crypto", "lottery", "sports"];
  const offerType = validTypes.includes(type) ? type : "casino";

  const upstream = `https://one-dollar-admin.onrender.com/v1/public/offer/offerList/${offerType}?page=${encodeURIComponent(
    page
  )}&limit=${encodeURIComponent(limit)}&country=${encodeURIComponent(country)}`;

  try {
    const res = await fetch(upstream, {
      // force server-side fetch
      cache: "no-store",
      // You can forward headers if needed
      headers: {
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        { error: "Upstream error", status: res.status, body: text },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data, {
      status: 200,
      headers: {
        // Allow same-origin calls from your Next app (not required but explicit)
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch offers", details: String(err) },
      { status: 500 }
    );
  }
}
