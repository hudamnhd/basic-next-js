import { NextResponse } from "next/server";

const API_URL = "http://localhost:8080/todos";

export async function GET(req: Request) {
  const res = await fetch(API_URL);
  const data = await res.json();
  console.log("JALANBOS");
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const data = await req.json();
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return NextResponse.json({ message: "Todo successfully added" });
}

export async function PUT(req: Request) {
  const data = await req.json();
  const res = await fetch(`${API_URL}/${data.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return NextResponse.json({
    message: `Todo id ${data.id} successfully updated`,
  });
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id)
    return NextResponse.json({ message: "id todo required" }, { status: 400 });
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  return NextResponse.json({ message: `Todo id ${id} success deleted` });
}
