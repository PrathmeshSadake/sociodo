import { db } from "@/db";
import { NextResponse } from "next/server";

export async function GET(request, response) {
  const url = new URL(request.url);
  const searchQuery = url.searchParams.get("query") || "";
  const decodedQuery = decodeURIComponent(searchQuery);
  console.log(decodedQuery);
  try {
    let posts = [];
    let comments = [];

    posts = await db.post.findMany({
      where: {
        body: {
          contains: decodedQuery,
        },
      },
      include: {
        user: true,
        comments: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    comments = await db.comment.findMany({
      where: {
        body: {
          contains: decodedQuery,
        },
      },
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ results: [...posts, ...comments] });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
