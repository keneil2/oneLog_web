<template>
  <div
    class="flex flex-col gap-6 rounded-[5px] border p-6"
    :class="highlighted ? 'border-primary/40 bg-primary/5' : 'border-default bg-neutral-950'"
  >
    <h2 class="text-xl font-semibold tracking-[-0.02em]" :class="highlighted ? 'text-primary' : 'text-highlighted'">
      {{ name }}
    </h2>

    <div class="flex items-baseline gap-2 border-t border-dashed border-default pt-6">
      <span class="text-[44px] leading-none font-semibold tracking-[-0.035em] text-highlighted">
        ${{ price }}
      </span>
      <span class="text-sm text-muted">/mo</span>
    </div>

    <UButton
      :variant="highlighted ? 'solid' : 'soft'"
      :color="highlighted ? 'primary' : 'neutral'"
      block
      :label="price === 0 ? 'Get started' : `Start with ${name}`"
      class="h-11 rounded-[5px] text-sm font-semibold active:translate-y-px cursor-pointer"
      :class="{ 'shadow-lg shadow-primary/20 ': highlighted }"
      @click="emit('select')"
    />

    <ul class="flex flex-col gap-3 border-t border-dashed border-default pt-6 text-sm">
      <template v-for="row in rows" :key="row.label">
        <li class="flex items-center gap-3">
          <UIcon :name="row.icon" class="size-4 shrink-0 text-muted" />
          <span>{{ row.label }}</span>
        </li>
      </template>
    </ul>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  name: string;
  amount: string;
  features: Array<{ name: string; quota_amount: number }>;
  highlighted?: boolean;
}>();

const emit = defineEmits<{ select: [] }>();

// Amount comes from the API in cents, as a string.
const price = computed(() => Number(props.amount) / 100);

// The API marks unlimited with PHP_INT_MAX, which JS can't hold exactly.
const isUnlimited = (quota: number) => quota >= Number.MAX_SAFE_INTEGER;

const compact = new Intl.NumberFormat("en", { notation: "compact" });

const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

const countOrUnlimited = (quota: number, noun: string) =>
  isUnlimited(quota) ? `Unlimited ${noun}` : `${quota} ${noun}`;

const featureDisplay: Record<string, { icon: string; label: (quota: number) => string | null }> = {
  "events included": {
    icon: "i-lucide-activity",
    label: (quota) => `${compact.format(quota)} events / month`,
  },
  "days lookback": {
    icon: "i-lucide-calendar",
    label: (quota) => `${quota} days retention`,
  },
  applications: {
    icon: "i-lucide-layers",
    label: (quota) => countOrUnlimited(quota, "applications"),
  },
  environments: {
    icon: "i-lucide-git-branch",
    label: (quota) => countOrUnlimited(quota, "environments"),
  },
  seats: {
    icon: "i-lucide-users",
    label: (quota) => countOrUnlimited(quota, "seats"),
  },
  "email support": {
    icon: "i-lucide-mail",
    label: () => "Email support",
  },
  "thresholds per application": {
    icon: "i-lucide-bell",
    label: (quota) => (quota === 0 ? null : `${quota} thresholds per application`),
  },
  "discounted additional events": {
    icon: "i-lucide-circle-plus",
    label: () => "Discounted additional events",
  },
};

const rows = computed(() => {
  const seen = new Set<string>();
  const result: Array<{ icon: string; label: string }> = [];

  for (const feature of props.features) {
    // The API can return the same feature twice (e.g. "days lookback").
    if (seen.has(feature.name)) continue;
    seen.add(feature.name);

    const display = featureDisplay[feature.name];
    const label = display ? display.label(feature.quota_amount) : capitalize(feature.name);
    if (label === null) continue;

    result.push({ icon: display?.icon ?? "i-lucide-check", label });
  }

  return result;
});
</script>
