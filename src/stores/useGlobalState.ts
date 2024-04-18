import { Alquran } from "@/types";
import { betterQuery } from "@/utils";
import { defineStore } from "pinia";

interface GlobalState {
  data: Alquran[];
  q: string;
}

export const useGlobalState = defineStore("global", {
  state: (): GlobalState => ({
    data: [],
    q: "",
  }),
  getters: {
    getQuranByQ: (state) => {
      return (q: string) => {
        state.data = state.data.filter((item) =>
          betterQuery(item.namaLatin).includes(betterQuery(q))
        );
      };
    },
  },
});
