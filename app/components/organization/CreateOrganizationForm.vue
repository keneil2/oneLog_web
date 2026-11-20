<template>
  <div class="w-full max-w-[540px] rounded-[5px] border border-default bg-neutral-900 p-10">
    <header class="mb-8 flex flex-col gap-2">
      <h1 class="text-[26px] leading-[1.15] font-semibold tracking-[-0.03em] text-highlighted">
        Create your organization
      </h1>
      <p class="text-[14px] text-muted">Your projects, logs and team will live here.</p>
    </header>

    <UForm :schema="schema" :state="state" class="flex flex-col gap-6" @submit="onSubmit">
      <div class="flex items-center gap-3 rounded-[5px] border border-default bg-neutral-950 px-4 py-3">
        <UBadge :label="currentSubscription?.subscription_name" color="primary" variant="subtle" size="sm" class="uppercase" />
        <span class="text-sm font-medium text-highlighted">plan</span>

        <span class="ms-auto text-sm text-muted">
          <span class="font-semibold text-highlighted">${{ currentSubscription?.price.unit_price.amount }}</span>
          / {{ currentSubscription?.price.billing_cycle.interval }}
        </span>
        <UButton
          label="Change"
          color="neutral"
          variant="outline"
          size="sm"
          @click="changePlan()"
          class="rounded-[5px] bg-neutral-800 px-3 font-medium text-highlighted hover:bg-neutral-700"
        />
      </div>

      <div class="flex items-start gap-3">
        <UFormField name="icon" label="Icon" :ui="{ label: 'text-[13px] font-medium', container: 'mt-2' }">
          <label
            class="flex size-11 cursor-pointer items-center justify-center overflow-hidden rounded-[5px] border border-dashed border-accented bg-neutral-950 text-muted transition-colors hover:border-primary hover:text-highlighted"
            aria-label="Upload icon (PNG or JPG)"
            title="PNG or JPG"
          >
            <img v-if="iconPreview" :src="iconPreview" alt="" class="size-full object-cover" />
            <UIcon v-else name="i-lucide-upload" class="size-4" />
            <input type="file" accept="image/png,image/jpeg" class="sr-only" @change="onIconChange" />
          </label>
        </UFormField>

        <div class="flex-1">
          <BaseInput v-model="state.name" name="name" label="Organization name" placeholder="Acme Inc." autocomplete="organization" />
        </div>
      </div>

      <BaseSelect v-model="state.type" class="capitalize" name="type" label="Organization type" :items="organizationTypes" />

      <BaseInput
        v-model="state.billing_address"
        name="billing_address"
        label="Billing address"
        placeholder="Street, city, country"
        optional
      />

      <BaseButton type="submit" label="Create organization" trailing-icon="i-lucide-arrow-right" class="mt-1" />
    </UForm>
  </div>
</template>

<script lang="ts" setup>
import type { CreateOrganization } from "~/types/organization";
import BaseInput from "~/components/base/BaseInput.vue";
import BaseSelect from "~/components/base/BaseSelect.vue";
import BaseButton from "~/components/base/BaseButton.vue";
import  { z } from "zod";
const { success } = useNotify();
const { $subscription, $organization } = useNuxtApp();
const emit = defineEmits<{
  changePlan:[]
}>();

const currentSubscription = ref({
    subscription_name: "",
    price: {
        unit_price: { amount: "0" },
        billing_cycle: { interval: "month" },
    },
});

async function changePlan(){
  emit("changePlan");
}

async function getCurrentSubscription() {
  const result = await $subscription.getUserSubscription();
  console.log(result);      
  currentSubscription.value = result.data;
}

onMounted(async () => {
  await getCurrentSubscription();
});

async function onSubmit() {

  const formData = new FormData();
    for(const [key,value] of Object.entries(state)){
      if (value === undefined || value === null) continue;
      formData.append(key,value);
  } 
  const response = await $organization.createOrganization(formData);
  if (response.success) {
    success(response.message);
  }
}

const schema = z.object({
  name:z.string("Organization Name is required").min(1, "Organization Name is required"),
  icon:z.file().mime(["image/jpeg","image/png"]).max(2 * 1024 * 1024, "Icon must be 2MB or smaller").optional(),
  type:z.enum(["individual", "company", "personal"], {
  message: "Please select a type",
}),
  billing_address:z.string().optional()
})
const organizationTypes = [ "individual","company", "personal"];

const state = reactive<CreateOrganization>({
  name: undefined,
  icon: undefined,
  type: "Company",
  billing_address: undefined ,
});

const iconPreview = ref<string>();

function onIconChange(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) return;

  state.icon = file;
  if (iconPreview.value) URL.revokeObjectURL(iconPreview.value);
  iconPreview.value = URL.createObjectURL(file);
}
</script>
