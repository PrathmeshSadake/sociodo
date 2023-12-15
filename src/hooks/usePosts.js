import useSWR from "swr";
import axios from "axios";

const fetcher = (url) => axios.get(url).then((res) => res.data);

const usePosts = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/posts", fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default usePosts;
