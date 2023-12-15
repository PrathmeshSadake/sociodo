"use client";
import { useParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import usePost from "@/hooks/usePost";
import Form from "@/components/Form";
import PostItem from "@/components/PostItem";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import CommentFeed from "@/components/CommentFeed";

const PostView = () => {
  const { postId } = useParams();

  const { data, isLoading } = usePost(postId);

  if (isLoading || !data.success) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Loader2 className='h-8 w-8 animate-spin text-zinc-800' />
      </div>
    );
  }

  return (
    <MaxWidthWrapper>
      <PostItem data={data.post} />
      <Form postId={postId} isComment placeholder='Tweet your reply' />
      <CommentFeed comments={data.post.comments} />
    </MaxWidthWrapper>
  );
};

export default PostView;
