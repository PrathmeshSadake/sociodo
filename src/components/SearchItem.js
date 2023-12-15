import Image from "next/image";
import { User, MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

import { formatDistanceToNowStrict } from "date-fns";
import { Avatar, AvatarFallback } from "./ui/avatar";

const SearchItem = ({ data = {}, userId }) => {
  const router = useRouter();

  const goToUser = useCallback(
    (ev) => {
      ev.stopPropagation();
      router.push(`/users/${data.user.userId}`);
    },
    [router]
  );

  const goToPost = useCallback(() => {
    router.push(`/posts/${data.id}`);
  }, [router, data.id]);

  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }

    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data.createdAt]);

  return (
    <div
      onClick={goToPost}
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

        <div className='flex flex-col items-start gap-2'>
          <div>
            <p
              onClick={goToUser}
              className='text-gray-700 hover:text-gray-900 font-semibold cursor-pointer'
            >
              {data.user.name ? data.user.name : "Anonymous"}
            </p>
            <span className='text-neutral-500 text-sm'>{createdAt} ago</span>
          </div>

          <div className='text-black mt-1'>{data.body}</div>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
