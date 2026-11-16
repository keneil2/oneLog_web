<script lang="ts" setup>
import "~/assets/main.css"

useHead({
script:[{
src:"https://cdn.paddle.com/paddle/v2/paddle.js",
async:true,
}]
});
</script>
<template>
  <UApp :toaster="{ position: 'top-right' }">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
