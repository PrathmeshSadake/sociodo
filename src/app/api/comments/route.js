import { db } from "@/db";
import { NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function POST(req) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user || !user.id || !user.email)
    throw new Error({ message: "UNAUTHORIZED", code: 403 });
  const { body } = await req.json();
  const { searchParams } = new URL(req.url);
  const postId = searchParams.get("postId");
  try {
    if (!postId || typeof postId !== "string") {
      throw new Error("Invalid ID");
    }
    const comment = await db.comment.create({
      data: {
        body,
        userId: user.id,
        postId,
      },
    });
    return NextResponse.json({ success: true, comment });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
