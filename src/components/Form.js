"use client";
import axios from "axios";
import Image from "next/image";
import { User } from "lucide-react";
import { useCallback, useState } from "react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

import usePosts from "@/hooks/usePosts";
import usePost from "@/hooks/usePost";

import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";

const Form = ({ placeholder, isComment, postId }) => {
  const { isLoading: isUserLoading, user } = useKindeBrowserClient();

  if (!isUserLoading && !user) {
    redirect("/api/auth/login");
  }

  const { mutate: mutatePosts } = usePosts();
  const { mutate: mutatePost } = usePost(postId);

  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      const url = isComment ? `/api/comments?postId=${postId}` : "/api/posts";

      await axios.post(url, { body });

      setBody("");
      mutatePosts();
      mutatePost();
    } catch (error) {
      console.log("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [body, mutatePosts, isComment, postId, mutatePost]);

  return (
    <div className='px-5 py-2 rounded-lg bg-card mb-6'>
      {user && (
        <div className='flex flex-row gap-4'>
          <div>
            <Avatar className='relative w-8 h-8'>
              {user.picture ? (
                <div className='relative aspect-square h-full w-full'>
                  <Image
                    fill
                    src={user.picture}
                    alt='profile picture'
                    referrerPolicy='no-referrer'
                  />
                </div>
              ) : (
                <AvatarFallback>
                  <span className='sr-only'>
                    {`${user.given_name} ${user.family_name}`}
                  </span>
                  <User className='h-4 w-4 text-zinc-900' />
                </AvatarFallback>
              )}
            </Avatar>
          </div>
          <div className='w-full'>
            <textarea
              disabled={isLoading}
              onChange={(event) => setBody(event.target.value)}
              value={body}
              className='disabled:opacity-80 py-2 px-3 resize-none w-full bg-gray-100 ring-0 outline-none text-sm placeholder-neutral-500 text-black'
              placeholder={placeholder}
            ></textarea>
            <div className='mt-2 flex flex-row justify-end'>
              <Button
                disabled={isLoading || !body}
                onClick={onSubmit}
                label='Tweet'
                variant='outline'
                className='min-w-[100px]'
              >
                Post
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
