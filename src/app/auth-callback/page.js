"use client";
import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Loader2 } from "lucide-react";
import axios from "axios";

const AuthCallback = () => {
  const { isLoading, user } = useKindeBrowserClient();

  const router = useRouter();
  const searchParams = useSearchParams();
  const origin = searchParams.get("origin");

  useEffect(() => {
    const createDbUser = async () => {
      try {
        const { data } = await axios.post("/api/user");

        if (data.success) {
          router.push(origin ? `/${origin}` : "/");
        }
      } catch (error) {
        router.push("/api/auth/login");
      }
    };
    if (!isLoading && !user) {
      router.push("/api/auth/login");
    } else {
      createDbUser();
    }
  }, []);

  return (
    <div className='w-full mt-24 flex justify-center'>
      <div className='flex flex-col items-center gap-2'>
        <Loader2 className='h-8 w-8 animate-spin text-zinc-800' />
        <h3 className='font-semibold text-xl'>
          You will be redirected automatically...
        </h3>
      </div>
    </div>
  );
};

export default AuthCallback;
