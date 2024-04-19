<script lang="ts" setup>
import { RouterLink } from "vue-router";
import { useAlquran } from "@/composable/alquran";
import TemporaryLoading from "@/components/TemporaryLoading.vue";
import { useGlobalState } from "@/stores/useGlobalState";
import { watch } from "vue";
import { storeToRefs } from "pinia";
import TemporaryEmpty from "@/components/TemporaryEmpty.vue";
import { Button } from "@/components/ui/button";
import { useWindowSize } from "@vueuse/core";

const { width, height } = useWindowSize();

const { data, error, isError, isLoading } = useAlquran();
const store = useGlobalState();
const { getQuranByQ } = storeToRefs(store);
watch(data, (newData, _oldData) => {
  store.data = newData!;
});

watch(
  () => store.q,
  (newData, _oldData) => {
    if (newData !== "") {
      getQuranByQ.value(newData);
    } else {
      store.data = data.value!;
    }
  }
);
</script>
<template>
  <TemporaryLoading v-if="isLoading" />
  <div
    class="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 base-container gap-4"
  >
    <RouterLink
      v-for="(surah, _index) of store.data"
      :key="surah.nomor"
      v-if="store.data.length > 0"
      class="bg-primaryLight hover:shadow-md shadow-muted-foreground base-transition rounded-xl fl-ic justify-between p-4 gap-4 relative dark:bg-black/70"
      :to="{
        name: 'Surat',
        params: { id: surah.nomor },
      }"
    >
      <div class="md:flex md:flex-row fl-col gap-4 w-full sm:w-auto">
        <div class="fl-ic justify-between">
          <div
            class="border-2 border-primaryDarkBlue border-solid rounded-full min-w-9 min-h-9 fl-ic justify-center"
          >
            <p class="">
              {{ surah.nomor }}
            </p>
          </div>
          <p
            class="lg:text-xl md:text-base text-xl font-semibold"
            v-if="width < 640"
          >
            {{ surah.nama }}
          </p>
        </div>
        <div class="fl-col gap-4">
          <div class="fl-ic gap-2">
            <h5 class="font-semibold">
              {{ surah.namaLatin }}
            </h5>
            <p class="text-primaryDarkBlue text-sm italic">
              ({{ surah.arti }})
            </p>
          </div>
          <div class="fl-ic gap-2">
            <Button :variant="'base'" :size="'sm'" class="text-xs fl-ic gap-2">
              <img src="/makkah.png" v-if="surah.tempatTurun === 'Mekah'" />
              <img src="/madinah.png" v-if="surah.tempatTurun === 'Madinah'" />
              <span>
                {{ surah.tempatTurun }}
              </span>
            </Button>
            <Button :variant="'base'" :size="'sm'" class="text-xs fl-ic gap-2">
              <img src="/alquran.png" />
              <span> {{ surah.jumlahAyat }} Ayat </span>
            </Button>
          </div>
        </div>
      </div>
      <div v-if="width > 640">
        <p class="text-xl font-semibold">
          {{ surah.nama }}
        </p>
      </div>
    </RouterLink>
    <TemporaryEmpty v-else v-if="!isLoading" />
  </div>
</template>
