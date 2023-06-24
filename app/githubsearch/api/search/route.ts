import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json({ error: "No query provided" }, { status: 400 });
  }

  const res = await fetch(`https://api.github.com/search/users?q=${query}`);

  const results = await res.json();

  return NextResponse.json(results);
}
