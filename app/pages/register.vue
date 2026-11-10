<template>
  <AuthLayout>
    <UForm :schema="schema" :state="state" class="flex flex-col gap-5" @submit="onSubmit">
      <header class="mb-2 flex flex-col gap-2.5">
        <h1 class="text-[34px] leading-[1.1] font-semibold tracking-[-0.035em]">
          Create your account
        </h1>
        <p class="text-[15px] text-muted">
          Already have one?
          <NuxtLink to="/login" class="auth-link font-medium">Sign in</NuxtLink>
        </p>
      </header>

      <UFormField
        name="email"
        label="Email"
        :ui="{ label: 'text-[13px] font-medium', container: 'mt-2' }"
      >
        <UInput
          v-model="state.email"
          type="email"
          autocomplete="email"
          placeholder="you@example.com"
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
          autocomplete="new-password"
          placeholder="Create a password"
          variant="none"
          class="w-full"
          :ui="{ base: 'auth-input', trailing: 'pe-1' }"
        >
          <template #trailing>
            <button
              type="button"
              class="flex size-[38px] items-center justify-center rounded-[5px] text-muted hover:text-highlighted"
              :aria-label="showPassword ? 'Hide passwords' : 'Show passwords'"
              :aria-pressed="showPassword"
              @click="showPassword = !showPassword"
            >
              <UIcon :name="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'" class="size-4" />
            </button>
          </template>
        </UInput>
      </UFormField>

      <UFormField
        name="password_confirmation"
        label="Confirm password"
        :ui="{ label: 'text-[13px] font-medium text-toned', container: 'mt-2' }"
      >
        <UInput
          v-model="state.password_confirmation"
          :type="showPassword ? 'text' : 'password'"
          autocomplete="new-password"
          placeholder="Re-enter your password"
          variant="none"
          class="w-full"
          :ui="{ base: 'auth-input' }"
        />
      </UFormField>

      <UButton
        type="submit"
        variant="solid"
        block
        loading-auto
        trailing-icon="i-lucide-arrow-right"
        label="Create account"
        class="mt-1 h-11 rounded-[5px] text-sm font-semibold shadow-lg shadow-primary/20 active:translate-y-px"
      />

      <p class="text-center text-[12.5px] leading-normal text-muted">
        By signing up, you agree to our
        <a href="#" class="auth-link text-toned">Terms of Service</a>
      </p>
    </UForm>
  </AuthLayout>
</template>

<script lang="ts" setup>
import * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";
import type { User } from "~/repositories/auth/auth";

const { $auth } = useNuxtApp();

const schema = z
  .object({
    email: z.email("Invalid Email"),
    password: z.string("Password Required").min(8, "Must be atleast 8 characters long"),
    password_confirmation: z.string("Password Required"),
  })
  .refine((data) => data.password == data.password_confirmation, {
    error: "Passwords don't match",
    path: ["password_confirmation"],
  });

const state = reactive<Partial<User>>({
  email: undefined,
  password: undefined,
  password_confirmation: undefined,
});

const showPassword = ref(false);
const {push} = useRouter();
async function onSubmit(payload: FormSubmitEvent<User>) {
  await $auth.register(payload.data).then(()=>push("/email-sent?email="+encodeURIComponent(payload.data.email)));
}
</script>
