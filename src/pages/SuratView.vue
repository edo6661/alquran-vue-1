<script setup lang="ts">
import TemporaryLoading from "@/components/TemporaryLoading.vue";
import { onBeforeRouteUpdate, useRoute, onBeforeRouteLeave } from "vue-router";
import { useSurat } from "@/composable/surat";
import Input from "@/components/ui/input/Input.vue";
import SuratCard from "@/components/surat/SuratCard.vue";
import { computed, onMounted, ref, watch } from "vue";
import TemporaryEmpty from "@/components/TemporaryEmpty.vue";
import { betterQuery } from "@/utils";
import { vAutoAnimate } from "@formkit/auto-animate/vue";
import { Icon } from "@iconify/vue";
import Button from "@/components/ui/button/Button.vue";
import { RouterLink } from "vue-router";
import TransitionFade from "@/components/TransitionFade.vue";

const route = useRoute();
const paramsId = ref<string>(route.params.id as string);
const show = ref<boolean>(false);

onBeforeRouteUpdate((to, _from, next) => {
  if (show.value) {
    show.value = false;
    setTimeout(() => {
      show.value = true;
    }, 200);
  } else show.value = true;
  paramsId.value = to.params.id as string;
  next();
});

onMounted(() => {
  show.value = true;
});

const { data, isLoading, isFetching } = useSurat(paramsId);
const query = ref<string>("");

const filteredData = computed(() =>
  query.value
    ? {
        ...data.value,
        ayat: data.value?.ayat.filter(
          (ayat) =>
            betterQuery(ayat.teksIndonesia).includes(
              betterQuery(query.value)
            ) ||
            betterQuery(ayat.teksArab).includes(betterQuery(query.value)) ||
            betterQuery(ayat.teksLatin).includes(betterQuery(query.value))
        ),
      }
    : data.value
);
</script>

<template>
  <TransitionFade>
    <section
      class="max-w-4xl mx-auto base-container"
      v-if="(!isLoading || !isFetching) && show"
    >
      <div
        class="bg-slate-200 dark:bg-black/70 px-8 py-6 space-y-8 rounded-t-2xl"
      >
        <div class="space-y-4 justify-center text-center">
          <h2 class="base-heading">{{ data?.nama }}</h2>
          <div class="fl-ic gap-2 justify-center">
            <h3 class="base-subheading">
              {{ data?.namaLatin }}
            </h3>
            <p>({{ data?.arti }})</p>
          </div>
          <div class="fl-ic gap-4 justify-center">
            <div
              class="border-2 border-solid border-primaryDarkGray rounded-[8px] px-4 py-2 fl-ic gap-2"
            >
              <img src="/makkah.png" v-if="data?.tempatTurun === 'Mekah'" />
              <img src="/madinah.png" v-if="data?.tempatTurun === 'Madinah'" />
              <p>{{ data?.tempatTurun }}</p>
            </div>
            <div class="w-2 h-2 rounded-full bg-primaryDarkGray" />
            <div
              class="border-2 border-solid border-primaryDarkGray rounded-[8px] px-4 py-2"
            >
              <p>{{ data?.jumlahAyat }} Ayat</p>
            </div>
          </div>
        </div>
        <div class="fl-ic gap-4 max-w-xs mx-auto">
          <RouterLink :to="{ name: 'Surat', params: { id: +paramsId - 1 } }">
            <Button variant="ghost">
              <Icon icon="mdi:skip-previous" :color="'#00CBBF'" :height="20" />
            </Button>
          </RouterLink>
          <Input placeholder="Search..." v-model="query" />
          <RouterLink
            :to="{
              name: 'Surat',
              params: { id: +paramsId + 1 },
            }"
          >
            <Button variant="ghost">
              <Icon
                icon="mdi:skip-next-outline"
                :color="'#00CBBF'"
                :height="20"
              />
            </Button>
          </RouterLink>
        </div>
      </div>
      <div class="bg-white dark:bg-black/15 px-8 py-6 space-y-8 rounded-b-2xl">
        <h4 class="base-subheading text-center">
          بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
        </h4>

        <div
          v-for="(ayat, i) in filteredData?.ayat"
          class="flex sm:justify-between sm:flex-row flex-col gap-8"
          v-if="filteredData?.ayat?.length"
        >
          <SuratCard :ayat="ayat" :i="i" />
        </div>
        <TemporaryEmpty
          v-if="!isLoading && !filteredData?.ayat?.length && query.length > 0"
        />
      </div>
    </section>
  </TransitionFade>
  <TemporaryLoading v-if="isLoading || isFetching" />
</template>
