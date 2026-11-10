<script lang="ts" setup>
withDefaults(
  defineProps<{
    source?: string;
    state?: Record<string, unknown>;
  }>(),
  { source: "app", state: () => ({}) },
);

// Decorative only: activity chart bar heights and the faded background logs.
const bars = [6, 9, 5, 12, 7, 5, 16, 8, 6, 10, 5, 7, 22, 11, 6, 8, 5, 13, 7, 9, 5, 18, 10, 6, 7, 5, 11, 8, 14, 6, 9, 5, 7, 20, 12, 7, 5, 9, 6, 11, 7, 5, 15, 8, 6, 10, 7, 5];
const wall = Array.from({ length: 32 }, (_, i) =>
  `00:${String((i * 7) % 60).padStart(2, "0")}:12 api-01 GET /v1/events 200     00:${String((i * 3) % 60).padStart(2, "0")}:48 queue-04 job.completed retries=0     00:${String((i * 5) % 60).padStart(2, "0")}:03 db-01 cache.hit key=session`,
);
</script>

<template>
  <section
    aria-hidden="true"
    class="relative flex min-w-0 flex-col items-center justify-center overflow-hidden border-l border-default bg-neutral-950 px-13 py-14"
  >
    <!-- Background: log wall, grid floor, glow -->
    <div class="mono wall absolute inset-0 overflow-hidden px-5 py-4 text-[10.5px] leading-[19px] whitespace-pre text-neutral-800 select-none">
      <div v-for="(row, i) in wall" :key="i">{{ row }}</div>
    </div>
    <div class="grid-floor absolute -inset-x-[40%] bottom-0 h-[90%]" />
    <div class="absolute top-1/2 left-1/2 h-[340px] w-[620px] -translate-x-1/2 -translate-y-[30%] bg-[radial-gradient(closest-side,var(--ui-primary),transparent)] opacity-20" />

    <div class="relative w-full max-w-[580px]">
      <!-- Two cards peeking out behind the window -->
      <div class="absolute inset-x-[7%] -top-[22px] h-20 rounded-xl border border-default bg-neutral-950" />
      <div class="absolute inset-x-[3.5%] -top-[11px] h-20 rounded-[13px] border border-default bg-neutral-900" />

      <!-- Terminal window -->
      <div class="mono relative overflow-hidden rounded-[14px] border border-default bg-linear-to-b from-neutral-900 to-neutral-950 shadow-2xl shadow-black/60">
        <div class="absolute inset-x-[12%] top-0 h-px bg-linear-to-r from-transparent via-primary/75 to-transparent" />

        <!-- Title bar -->
        <div class="flex h-11 items-center justify-between gap-3 border-b border-default px-4 text-xs">
          <span class="whitespace-nowrap text-toned">
            <span class="mr-2 text-dimmed">$</span>tail -f {{ source }}.log
          </span>
          <span class="flex h-6 items-center gap-2 rounded-md bg-primary/12 px-2.5 text-[11px] font-medium text-primary">
            <span class="live-dot size-1.5 rounded-full bg-current" />
            live
          </span>
        </div>

        <!-- Activity chart -->
        <div class="border-b border-default bg-neutral-950/40 px-4 pt-3.5 pb-3">
          <div class="mb-3 text-[11px] text-muted">Activity</div>
          <div class="flex h-[54px] items-end gap-0.5 border-b border-default">
            <span
              v-for="(h, i) in bars"
              :key="i"
              class="flex-1 rounded-t-[1px] bg-primary/20"
              :style="{ height: `${h}px` }"
            />
          </div>
        </div>

        <!-- One line per form field -->
        <div class="py-1.5 text-xs leading-[18px]">
          <div
            v-for="(value, name) in state"
            :key="name"
            class="grid min-h-9 grid-cols-[50px_1fr] items-center gap-2.5 px-4 py-1.5"
          >
            <span
              class="justify-self-start rounded px-1.5 text-[10px] font-medium"
              :class="value ? 'bg-primary/12 text-primary' : 'bg-elevated text-muted'"
            >
              {{ value ? "INFO" : "WAIT" }}
            </span>
            <span class="wrap-anywhere">
              <span :class="value ? 'text-highlighted' : 'text-dimmed'">field.{{ name }}</span>
              <span v-if="!value" class="text-dimmed"> waiting for input</span>
              <span v-else-if="String(name).includes('password')" class="text-muted"> value=[redacted]</span>
              <span v-else class="text-muted"> value="{{ value }}"</span>
            </span>
          </div>
        </div>

        <!-- Footer bar -->
        <div class="flex justify-end border-t border-default px-4 py-2.5 text-[11px] text-muted">
          <span class="flex items-center gap-1.5">
            <UIcon name="i-lucide-lock" class="size-3" />
            passwords never logged
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.mono {
  font-family: "Geist Mono", ui-monospace, monospace;
}

/* Background log text fades out towards the middle */
.wall {
  mask-image: linear-gradient(180deg, #000 0%, rgba(0, 0, 0, 0.45) 42%, transparent 62%);
}

/* Pattern tilted back in 3D to look like a floor */
.grid-floor {
  transform-origin: 50% 100%;
  transform: perspective(520px) rotateX(68deg);
  background-color: var(--ui-color-neutral-950);
  opacity: 0.8;
  background-image:
    radial-gradient(circle farthest-side at 0% 50%, var(--ui-color-neutral-950) 23.5%, transparent 0),
    radial-gradient(circle farthest-side at 0% 50%, var(--ui-border-accented) 24%, transparent 0),
    linear-gradient(var(--ui-color-neutral-950) 14%, transparent 0, transparent 85%, var(--ui-color-neutral-950) 0),
    linear-gradient(150deg, var(--ui-color-neutral-950) 24%, var(--ui-border-accented) 0 26%, transparent 0 74%, var(--ui-border-accented) 0 76%, var(--ui-color-neutral-950) 0),
    linear-gradient(30deg, var(--ui-color-neutral-950) 24%, var(--ui-border-accented) 0 26%, transparent 0 74%, var(--ui-border-accented) 0 76%, var(--ui-color-neutral-950) 0),
    linear-gradient(90deg, var(--ui-border-accented) 1.6%, var(--ui-color-neutral-950) 0 98.4%, var(--ui-border-accented) 0);
  background-position: 16px 23px, 14px 23px, 0 0, 0 0, 0 0, 0 0;
  background-size: 30px 45px;
  mask-image: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 75%);
  mask-size: 100% 100%;
  mask-repeat: no-repeat;
}

/* Pulsing dot next to "live" */
.live-dot {
  animation: pulse 2s ease-out infinite;
}
@keyframes pulse {
  0% { box-shadow: 0 0 0 0 color-mix(in oklab, var(--ui-primary) 55%, transparent); }
  70%, 100% { box-shadow: 0 0 0 7px transparent; }
}
@media (prefers-reduced-motion: reduce) {
  .live-dot { animation: none; }
}
</style>
