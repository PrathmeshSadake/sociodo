import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import PostFeed from "@/components/PostFeed";
import React from "react";

const UserPage = ({ params }) => {
  return (
    <MaxWidthWrapper>
      <PostFeed userId={params.userId} />
    </MaxWidthWrapper>
  );
};

export default UserPage;
