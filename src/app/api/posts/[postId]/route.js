import { db } from "@/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const urlArray = new URL(req.url).pathname.split("/");
    const postId = urlArray[urlArray.length - 1];

    if (!postId || typeof postId !== "string") {
      throw new Error("Invalid ID");
    }

    const post = await db.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        user: true,
        comments: {
          include: {
            user: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    return NextResponse.json({ success: true, post });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
