<script setup lang="ts">
import { useGlobalState } from "@/stores/useGlobalState";
import { Alquran } from "@/types";

defineProps({
  surah: {
    type: Object as () => Alquran,
    required: true,
  },
});
const store = useGlobalState();
// TODO REFACTOR
</script>
<template>
  <RouterLink
    v-for="(surah, _index) of store.data"
    :key="surah.nomor"
    v-if="store.data.length > 0"
    class="bg-primaryLight shadow-muted-foreground shadow-sm hover:shadow-md hover:shadow-muted-foreground base-transition rounded-xl fl-ic justify-between p-4"
    :to="{
      name: 'Surat',
      params: { id: surah.nomor },
    }"
  >
    <div class="fl-ic gap-4">
      <div
        class="border-2 border-primaryDarkBlue border-solid rounded-full min-w-8 min-h-8 fl-ic justify-center"
      >
        <p class="">
          {{ surah.nomor }}
        </p>
      </div>
      <div class="fl-col gap-4">
        <div class="fl-ic gap-2">
          <h5 class="font-semibold">
            {{ surah.namaLatin }}
          </h5>
          <p class="text-primaryDarkBlue text-sm truncate italic">
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
    <div>
      <p class="text-xl font-medium">
        {{ surah.nama }}
      </p>
    </div>
  </RouterLink>
</template>
