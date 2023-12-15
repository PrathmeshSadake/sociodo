import { db } from "@/db";
import { NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function POST() {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    // if (!user || !user.id || !user.email)
    //   return new NextResponse("Unauthorized", { status: 403 });

    const dbUser = await db.user.findFirst({
      where: {
        userId: user.id,
      },
    });

    if (!dbUser) {
      await db.user.create({
        data: {
          userId: user.id,
          email: user.email,
          image: user.picture,
          name: `${user.given_name ? user.given_name : ""} ${
            user.family_name ? user.family_name : ""
          }`,
        },
      });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

