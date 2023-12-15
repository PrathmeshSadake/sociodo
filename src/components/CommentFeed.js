"use client";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { formatDistanceToNowStrict } from "date-fns";
import Image from "next/image";
import { User } from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/avatar";

const CommentFeed = ({ comments = [] }) => {
  const router = useRouter();

  return (
    <>
      {comments.map((data) => (
        <div
          key={data.id}
          className='my-2 cursor-pointer p-6 rounded-lg border bg-card text-card-foreground shadow-sm'
        >
          <div className='flex flex-row items-start gap-3'>
            <Avatar className='relative w-8 h-8'>
              {data.user.image ? (
                <div className='relative aspect-square h-full w-full'>
                  <Image
                    fill
                    src={data.user.image}
                    alt='profile picture'
                    referrerPolicy='no-referrer'
                  />
                </div>
              ) : (
                <AvatarFallback>
                  <span className='sr-only'>{data.user.name}</span>
                  <User className='h-4 w-4 text-zinc-900' />
                </AvatarFallback>
              )}
            </Avatar>
            <div>
              <div className='flex flex-row items-center gap-2'>
                <p
                  onClick={(ev) => {
                    ev.stopPropagation();

                    router.push(`/users/${data.user.userId}`);
                  }}
                  className='text-gray-700 hover:text-gray-900 font-semibold cursor-pointer'
                >
                  {data.user.name ? data.user.name : "Anonymous"}
                </p>
                <span className='text-neutral-500 text-sm'>
                  {formatDistanceToNowStrict(new Date(data.createdAt))} ago
                </span>
              </div>
              <div className='text-black mt-1'>{data.body}</div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CommentFeed;
