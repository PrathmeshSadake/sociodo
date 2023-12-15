"use client";
import usePosts from "@/hooks/usePosts";
import PostItem from "./PostItem";

const PostFeed = ({ userId }) => {
  const { data } = usePosts(userId);

  return (
    <>
      {data && data.posts.map((post) => <PostItem key={post.id} data={post} />)}
    </>
  );
};

export default PostFeed;
