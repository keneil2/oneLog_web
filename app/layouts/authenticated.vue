<!--
  Layout for logged-in pages: same shell as default, plus a sign out button.
  Use with definePageMeta({ layout: "authenticated" }).
-->
<template>
  <div class="flex min-h-screen flex-col relative">
    <header class="flex items-center justify-between px-4 py-7 sm:px-10">
      <NuxtLink to="/" class="flex w-fit items-center gap-2.5 text-[15px] font-semibold text-highlighted">
        <img src="/cut-through-bolt.svg" alt="" class="size-7" />
        OneLog
      </NuxtLink>
    </header>

    <main class="flex flex-1 flex-col">
      <slot />
    </main>

    <footer class="flex flex-wrap justify-between gap-x-5 gap-y-2 px-4 py-7 text-[12.5px] text-muted sm:px-10">
      <span>© {{ new Date().getFullYear() }} OneLog</span>
    </footer>
  </div>
</template>

<script lang="ts" setup>
const { $auth } = useNuxtApp();
</script>
