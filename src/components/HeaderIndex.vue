<script setup lang="ts">
import Button from "./ui/button/Button.vue";
import Input from "./ui/input/Input.vue";
import ThemeMode from "./ThemeMode.vue";
import { RouterLink } from "vue-router";
import { computed, watch } from "vue";
import { useGlobalState } from "@/stores/useGlobalState";
import { Icon } from "@iconify/vue";
import { surahHeader } from "@/constants";

const store = useGlobalState();
watch(
  () => store.q,
  (q) => store.$patch({ q })
);
</script>

<template>
  <header class="bg-primaryDarkBlue pb-4 space-y-4 relative">
    <nav class="max-w-xl mx-auto">
      <div class="flex justify-between py-4">
        <div class="flex gap-8">
          <RouterLink to="/">
            <img src="/logo.png" alt="Logo" class="w-24 h-24" />
          </RouterLink>
          <h1 class="base-heading mt-4">Alquran</h1>
        </div>

        <div class="mt-6">
          <ThemeMode />
        </div>
      </div>
    </nav>
    <div class="fl-col justify-center items-center gap-4 max-w-xl mx-auto">
      <div class="fl-ic relative w-full" v-if="$route.name !== 'Surat'">
        <Input
          v-model="store.q"
          placeholder="Pencarian surah dalam Alquran..."
          class="placeholder:text-primaryDarkBlue py-6 px-8 text-lg"
        />
        <Icon
          icon="material-symbols:search"
          height="32"
          color="#624BC3"
          class="absolute right-2"
        />
      </div>
      <div class="fl-ic flex-wrap gap-2">
        <p class="font-medium text-lg">Sering Dibaca:</p>
        <RouterLink
          v-for="item in surahHeader"
          :key="item.id"
          :to="{ name: 'Surat', params: { id: item.id } }"
        >
          <Button
            variant="header"
            :class="{
              'bg-primaryLightGreen': +$route.params.id !== item.id,
              'bg-primaryDarkGray': +$route.params.id === item.id,
            }"
          >
            {{ item.name }}
          </Button>
        </RouterLink>
      </div>
    </div>
  </header>
</template>

<style scoped></style>
