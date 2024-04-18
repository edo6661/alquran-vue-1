<script setup lang="ts">
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/vue";

defineProps({
  trigger: String,
  icon: String,
});
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button variant="ghost" v-if="icon">
        <Icon :icon="icon" :color="'#00CBBF'" :height="18" />
      </Button>
      <Button variant="outline" v-else>
        {{ trigger }}
      </Button>
    </PopoverTrigger>
    <PopoverContent>
      <slot />
    </PopoverContent>
  </Popover>
</template>
