import { Surah, SuratData } from "@/types";
import { useQuery, useQueryClient } from "@tanstack/vue-query";
import axios from "axios";
import { Ref, watch } from "vue";

export const fetchSurat = async (id: string) => {
  return axios
    .get<SuratData>(`${import.meta.env.VITE_API_URL}/${id}`)
    .then((res) => res.data.data)
    .catch((err) => {
      throw err;
    });
};

export const useSurat = (id: Ref<string>) => {
  const queryClient = useQueryClient();
  const { isLoading, data, error, isError, isFetching, refetch } =
    useQuery<Surah>({
      queryKey: ["surat", id.value],
      queryFn: () => fetchSurat(id.value),
      retryOnMount: true,
    });

  watch(id, () => {
    queryClient.setQueryData(["surat", id.value], fetchSurat(id.value));
    refetch();
  });
  return { isLoading, data, error, isError, isFetching, refetch };
};
