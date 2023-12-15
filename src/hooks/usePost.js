import useSWR from "swr";
import axios from "axios";

const fetcher = (url) => axios.get(url).then((res) => res.data);

const usePost = (postId) => {
  const { data, error, isLoading, mutate } = useSWR(
    postId ? `/api/posts/${postId}` : null,
    fetcher
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default usePost;
