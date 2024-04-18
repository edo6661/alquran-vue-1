<script setup lang="ts">
import { RouterView } from "vue-router";
import Header from "./components/Header.vue";
import { VueQueryDevtools } from "@tanstack/vue-query-devtools";
import { Toaster } from "./components/ui/sonner";
</script>

<template>
  <VueQueryDevtools />
  <Header />
  <RouterView />
  <Toaster />
</template>

<style scoped></style>
