import React from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/db";
import Form from "@/components/Form";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import PostFeed from "@/components/PostFeed";

const Home = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user?.email || !user.id) redirect(`/auth-callback`);

  const dbUser = await db.user.findFirst({
    where: {
      userId: user.id,
    },
  });

  if (!dbUser) redirect("/auth-callback");

  return (
    <MaxWidthWrapper>
      <Form placeholder="What's happening?" />
      <PostFeed />
    </MaxWidthWrapper>
  );
};

export default Home;
