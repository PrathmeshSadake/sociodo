"use client";
import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import Form from "@/components/Form";
import PostFeed from "@/components/PostFeed";
import { Input } from "@/components/ui/input";
import useSearch from "@/hooks/useSearch";
import SearchItem from "./SearchItem";

const Timeline = () => {
  const [query, setQuery] = useState("");

  const { data, isLoading } = useSearch(query);

  if (query.length > 0) {
    data && console.log("Search Result", data.results);
  }

  return (
    <div>
      <div className='mx-auto my-4 flex w-full max-w-sm items-center space-x-2'>
        <Input
          placeholder="Search for what's interesting."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <Form placeholder="What's happening?" />
      {query.length === 0 || query.trim().length === 0 ? (
        <PostFeed />
      ) : (
        <>
          {isLoading && (
            <div className='w-full py-12 flex justify-center item-center'>
              <Loader2 className='h-8 w-8 animate-spin text-zinc-800' />
            </div>
          )}
          {data &&
            data.results.map((post) => (
              <SearchItem key={post.id} data={post} />
            ))}
        </>
      )}
    </div>
  );
};

export default Timeline;
