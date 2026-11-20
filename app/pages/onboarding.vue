<template>
  <div class="flex flex-1 flex-col">
    <UModal fullscreen v-model:open="open">
      <template #body>
        <div class="mx-auto w-full max-w-[1100px] px-4 py-10">
          <Subscription @checkout="modalToggle" />
        </div>
      </template>
    </UModal>

    <div class="flex flex-1 items-center justify-center px-4 py-10">
      <CreateOrganizationForm @change-plan="modalToggle" />
    </div>
  </div>
</template>

<script lang="ts" setup>

import CreateOrganizationForm from "~/components/organization/CreateOrganizationForm.vue";

const { $organization } = useNuxtApp();

definePageMeta({

  layout: "authenticated",
  middleware: ["auth"],

});

const orgExists = ref<boolean>(false);

const open = ref<boolean>(true);


function modalToggle() {

  open.value = !open.value;

}

onMounted(async () => {

  const res = await $organization.organizationExist();

  orgExists.value = res.data.exists;

});
</script>
