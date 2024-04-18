<script setup lang="ts">
import { Ayat } from "@/types";
import { useClipboard } from "@vueuse/core";
import { ref, Transition } from "vue";
import { toast } from "vue-sonner";
import { Icon } from "@iconify/vue";
import Button from "@/components/ui/button/Button.vue";
import Popover from "@/components/Popover.vue";
import Tooltip from "@/components/Tooltip.vue";

defineProps<{
  ayat: Ayat;
  i: number;
}>();
const source = ref("");
const { copy, isSupported } = useClipboard({
  source,
});
const onCopy = (text: string, msg: string) => {
  if (isSupported.value === false) {
    toast.error("Copy to clipboard is not supported in Your browser");
    return;
  }
  source.value = text;
  copy();
  toast.success(`Copied ${msg} To Clipboard!`);
};
const audio = new Audio();
const audioPlayed = ref<Record<number, boolean>>({});
let isAudioPlaying = false;
let activeAyatIndex = -1;

async function playAudio(ayat: Pick<Ayat, "audio">, i: number) {
  try {
    if (isAudioPlaying && activeAyatIndex !== i) {
      audio.pause();

      audioPlayed.value[activeAyatIndex] = false;
    }
    // ! kalo lagi play
    if (audioPlayed.value[i]) {
      // ! bakal di pause kalo di klik lagi dan ubah jadi false semua
      audio.pause();
      audioPlayed.value[i] = false;
      isAudioPlaying = false;
      activeAyatIndex = -1;
    } else {
      // ! kalo lagi ga play apa apa terus di klik bakal play
      audio.src = Object.values(ayat.audio)[0] as string;
      await audio.play();
      audioPlayed.value[i] = true;
      isAudioPlaying = true;
      activeAyatIndex = i;
      await new Promise(() => {
        // ! kalo audio selesai bakal diubah jadi false semua
        audio.onended = () => {
          audioPlayed.value[i] = false;
          isAudioPlaying = false;
          activeAyatIndex = -1;
        };
      });
    }
  } catch (error) {
    console.error("Error playing audio:", error);
  }
}
</script>
<template>
  <div class="fl-col gap-2 sm:order-1 order-2">
    <p class="text-secondaryLightBlue italic font-medium">
      {{ ayat.teksLatin }}
    </p>
    <div class="flex gap-2 text-sm">
      <p>{{ ayat.nomorAyat }}.</p>
      <p>
        {{ ayat.teksIndonesia }}
      </p>
    </div>
    <div class="fl-ic gap-2 flex-wrap">
      <!-- <Tooltip :msg="audioPlayed[i] ? 'Pause Audio' : 'Play Audio'">
        <Button
          :variant="'ghost'"
          @click="playAudio(ayat, i)"
          :class="audioPlayed[i] ? 'bg-accent text-accent-foreground' : ''"
          :disabled="isAudioPlaying && activeAyatIndex !== i"
        >
          <Icon
            :icon="audioPlayed[i] ? 'mdi:pause' : 'mdi:play'"
            class="text-primary"
            :color="'#00CBBF'"
            :height="18"
          />
        </Button>
      </Tooltip> -->

      <div class="btn-container">
        <Transition name="slide-up" model="out-in">
          <div v-if="audioPlayed[i]">
            <Tooltip :msg="'Pause Audio'">
              <Button
                v-if="audioPlayed[i]"
                @click="playAudio(ayat, i)"
                :class="
                  audioPlayed[i] ? 'bg-accent text-accent-foreground' : ''
                "
                :disabled="isAudioPlaying && activeAyatIndex !== i"
                :variant="'ghost'"
              >
                <Icon
                  :icon="'mdi:pause'"
                  class="text-primary"
                  :color="'#00CBBF'"
                  :height="18"
                />
              </Button>
            </Tooltip>
          </div>
          <div v-else>
            <Tooltip :msg="'Play Audio'">
              <Button @click="playAudio(ayat, i)" :variant="'ghost'">
                <Icon
                  :icon="'mdi:play'"
                  class="text-primary"
                  :color="'#00CBBF'"
                  :height="18"
                />
              </Button>
            </Tooltip>
          </div>
        </Transition>
      </div>

      <Popover icon="mdi:content-copy">
        <div class="fl-ic justify-between">
          <Tooltip msg="Copy Latin">
            <Button
              v-if="isSupported"
              @click="onCopy(ayat.teksLatin, 'Latin')"
              :size="'sm'"
              :variant="'ghost'"
              class="w-full"
            >
              Latin
            </Button>
          </Tooltip>
          <Tooltip msg="Copy Indonesia">
            <Button
              @click="onCopy(ayat.teksIndonesia, 'Indonesia')"
              :size="'sm'"
              :variant="'ghost'"
              class="w-full"
            >
              Indonesia
            </Button>
          </Tooltip>
          <Tooltip msg="Copy Arab">
            <Button
              @click="onCopy(ayat.teksArab, 'Arab')"
              :size="'sm'"
              :variant="'ghost'"
              class="w-full"
            >
              Arab
            </Button>
          </Tooltip>
        </div>
      </Popover>
    </div>
  </div>
  <div class="sm:order-2 order-1">
    <p class="sm:text-end font-medium">
      {{ ayat.teksArab }}
    </p>
  </div>
</template>

<style scoped>
.btn-container {
  position: relative;
  width: 50px;
  height: 40px;
}
.btn-container > div {
  position: absolute;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease-in-out;
}
.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
}
.slide-up-enter-from {
  transform: translateY(30px);
}
.slide-up-leave-to {
  transform: translateY(-30px);
}
</style>
