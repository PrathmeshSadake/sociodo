import React from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/db";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Timeline from "@/components/Timeline";

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
      <Timeline />
    </MaxWidthWrapper>
  );
};

export default Home;
