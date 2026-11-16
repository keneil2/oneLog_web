<template>
  <AuthLayout>
    <UForm :schema="schema" :state="state" class="flex flex-col gap-5" @submit="onSubmit">
      <header class="mb-2 flex flex-col gap-2.5">
        <h1 class="text-[34px] leading-[1.1] font-semibold tracking-[-0.035em]">
          Welcome back
        </h1>
        <p class="text-[15px] text-muted">
          New here?
          <NuxtLink to="/register" class="auth-link font-medium">Create an account</NuxtLink>
        </p>
      </header>

      <UFormField
        name="email"
        label="Email"
        :ui="{ label: 'text-[13px] font-medium text-toned', container: 'mt-2' }"
      >
        <UInput
          v-model="state.email"
          type="email"
          autocomplete="email"
          placeholder="you@company.com"
          variant="none"
          class="w-full"
          :ui="{ base: 'auth-input' }"
        />
      </UFormField>

      <UFormField
        name="password"
        label="Password"
        :ui="{ label: 'text-[13px] font-medium text-toned', container: 'mt-2' }"
      >
        <UInput
          v-model="state.password"
          :type="showPassword ? 'text' : 'password'"
          autocomplete="current-password"
          placeholder="Enter your password"
          variant="none"
          class="w-full"
          :ui="{ base: 'auth-input', trailing: 'pe-1' }"
        >
          <template #trailing>
            <button
              type="button"
              class="flex size-[38px] items-center justify-center rounded-[5px] text-muted hover:text-highlighted"
              :aria-label="showPassword ? 'Hide password' : 'Show password'"
              :aria-pressed="showPassword"
              @click="showPassword = !showPassword"
            >
              <UIcon :name="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'" class="size-4" />
            </button>
          </template>
        </UInput>
      </UFormField>

      <UButton
        type="submit"
        variant="solid"
        block
        loading-auto
        trailing-icon="i-lucide-arrow-right"
        label="Sign in"
        class="mt-1 h-11 rounded-[5px] text-sm font-semibold shadow-lg shadow-primary/20 active:translate-y-px"
      />
    </UForm>
  </AuthLayout>
</template>

<script lang="ts" setup>
import * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";
import type { User } from "~/repositories/auth/auth";
import { useAuthStatus } from "~/composeables/authStatus";

const { $auth } = useNuxtApp();

const schema = z.object({
  email: z.email("Invalid email"),
  password: z.string("Password is required").min(8, "Must be at least 8 characters"),
});
const authStatus = useAuthStatus();
const state = reactive<Partial<User>>({
  email: undefined,
  password: undefined,
});

const showPassword = ref(false);

async function onSubmit(payload: FormSubmitEvent<User>) {
  const response = await $auth.login(payload.data);
  if(response.success == true){
   authStatus.value = true;
  }
  console.log(response);
}
</script>
