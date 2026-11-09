<template>
  <div class="flex flex-col gap-5">
    <div
      class="flex size-10 items-center justify-center rounded-[10px] border"
      :class="tones[tone].badge"
    >
      <UIcon v-if="icon" :name="icon" class="size-5" />
      <Spinner v-else class="size-5" />
    </div>

    <header class="flex flex-col gap-2.5">
      <h1 class="text-[34px] leading-[1.1] font-semibold tracking-[-0.035em]">
        {{ title }}
      </h1>
      <p class="text-[15px] text-muted">{{ description }}</p>
    </header>

    <div class="flex items-center gap-2.5 rounded-[9px] border border-default bg-neutral-950 px-3 py-2.5 font-mono text-xs">
      <span
        class="rounded px-1.5 py-0.5 text-[10px] leading-none font-bold"
        :class="tones[tone].tag"
      >
        {{ logTag }}
      </span>
      <span>{{ logText }}</span>
    </div>

    <slot />
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  icon?: string;
  tone: "neutral" | "primary" | "warning" | "error";
  title: string;
  description: string;
  logTag: string;
  logText: string;
}>();

const tones = {
  neutral: {
    badge: "border-default bg-neutral-950 text-primary",
    tag: "bg-elevated text-toned",
  },
  primary: {
    badge: "border-primary/30 bg-primary/10 text-primary",
    tag: "bg-primary/15 text-primary",
  },
  warning: {
    badge: "border-warning/30 bg-warning/10 text-warning",
    tag: "bg-warning/15 text-warning",
  },
  error: {
    badge: "border-error/30 bg-error/10 text-error",
    tag: "bg-error/15 text-error",
  },
};
</script>
