import { db } from "@/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const urlArray = new URL(req.url).pathname.split("/");
    const userId = urlArray[urlArray.length - 1];

    if (!userId || typeof userId !== "string") {
      throw new Error("Invalid ID");
    }
    const user = await db.user.findUnique({
      where: {
        userId,
      },
    });

    const posts = await db.post.findMany({
      where: {
        userId,
      },
      include: {
        comments: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ success: true, user, posts });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
