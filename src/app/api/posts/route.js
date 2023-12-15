import { db } from "@/db";
import { NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function POST(request, response) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user || !user.id || !user.email)
      throw new Error({ message: "UNAUTHORIZED", code: 403 });

    const { body } = await request.json();

    const post = await db.post.create({
      data: {
        body,
        userId: user.id,
      },
    });
    return NextResponse.json({ success: true, post });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(request, response) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  try {
    let posts = [];
    if (userId && typeof userId === "string") {
      posts = await db.post.findMany({
        where: {
          userId,
        },
        include: {
          user: true,
          comments: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    } else {
      posts = await db.post.findMany({
        include: {
          user: true,
          comments: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }
    return NextResponse.json({ posts });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
