<template>
  <UFormField
    :name="name"
    :label="label"
    :hint="optional ? 'Optional' : undefined"
    :help="help"
    :ui="{ label: 'text-[13px] font-medium', hint: 'text-[12px] text-muted', help: 'text-[12px] text-muted', container: 'mt-2' }"
  >
    <UInput v-bind="$attrs" variant="none" class="w-full" :ui="{ base: 'auth-input' }" />
  </UFormField>
</template>

<script lang="ts" setup>
defineOptions({ inheritAttrs: false });

defineProps<{
  name: string;
  label: string;
  optional?: boolean;
  help?: string;
}>();
</script>
