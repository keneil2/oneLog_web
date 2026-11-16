<template>
      <UModal fullscreen v-model:open="open">
        <template #body>
          <div class="mx-auto w-full max-w-[1100px] px-4 py-10">
<Subscription @Checkout="closeModal()" /></div>
        </template>
        
      </UModal>
</template>

<script lang="ts" setup>

const open =ref<boolean>(true);
 function closeModal(){
  open.value=false;
  }

definePageMeta({ layout: "authenticated" });
</script>
