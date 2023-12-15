"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import PostFeed from "@/components/PostFeed";
import useUser from "@/hooks/useUser";
import { useParams } from "next/navigation";
import { Loader2, User } from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const UserPage = () => {
  const { userId } = useParams();

  const { data, isLoading } = useUser(userId);

  if (isLoading || !data.success) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Loader2 className='h-8 w-8 animate-spin text-zinc-800' />
      </div>
    );
  }

  return (
    <MaxWidthWrapper>
      {data && (
        <div className='my-4'>
          <p className='font-medium'>
            Latest from {data.user.name ? data.user.name : data.user.email}
          </p>
        </div>
      )}
      <PostFeed userId={userId} />
    </MaxWidthWrapper>
  );
};

export default UserPage;
