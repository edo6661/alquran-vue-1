<script setup lang="ts">
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
defineProps({
  msg: String,
});
</script>

<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger>
        <slot />
      </TooltipTrigger>
      <TooltipContent>
        <p class="font-medium">{{ msg }}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
