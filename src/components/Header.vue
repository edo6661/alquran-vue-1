<script setup lang="ts">
import Button from "./ui/button/Button.vue";
import Input from "./ui/input/Input.vue";
import ThemeMode from "./ThemeMode.vue";
import { RouterLink } from "vue-router";
import { watch } from "vue";
import { useGlobalState } from "@/stores/useGlobalState";

const store = useGlobalState();
watch(store, (value) => store.$patch({ q: value.q }));
</script>
<template>
  <header>
    <div class="fl-ic justify-between">
      <div>
        <RouterLink to="/"> Home </RouterLink>
      </div>
      <div>
        <Input placeholder="Search..." v-model="store.q" />
      </div>
      <div class="fl-ic gap-4">
        <Button :variant="'destructive'"> Test </Button>
        <ThemeMode />
      </div>
    </div>
  </header>
</template>
