<template>
  <div class="relative isolate flex flex-1 items-center justify-center px-4 py-10">
    <div aria-hidden="true" class="dots pointer-events-none absolute inset-0 -z-10" />

    <div class="w-full max-w-[392px] text-highlighted">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.dots {
  opacity: 0.8;
  background-image:
    radial-gradient(circle, var(--ui-border-accented) 0.8px, transparent 0.8px),
    radial-gradient(circle, var(--ui-border-accented) 0.8px, transparent 0.8px);
  background-size: 5px 20px, 20px 5px;
  background-position: -2.5px -10px, -10px -2.5px;
  mask-image: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 75%);
  mask-size: 100% 100%;
  mask-repeat: no-repeat;
}
</style>
