import { useQuery } from "@tanstack/vue-query";
import axios from "axios";
import { Alquran } from "@/types";

export const fetchAlquran = async () => {
  return axios
    .get(import.meta.env.VITE_API_URL)
    .then((res) => res.data.data)
    .catch((err) => {
      throw err;
    });
};

export const useAlquran = () => {
  const { isLoading, data, error, isError, isFetching } = useQuery<Alquran[]>({
    queryKey: ["surat"],
    queryFn: fetchAlquran,
  });
  return { isLoading, data, error, isError, isFetching };
};
