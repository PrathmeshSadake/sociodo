import useSWR from "swr";
import axios from "axios";

const fetcher = (url) => axios.get(url).then((res) => res.data);

const useUser = (userId) => {
  const { data, error, isLoading, mutate } = useSWR(
    userId ? `/api/user/${userId}` : null,
    fetcher
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useUser;
