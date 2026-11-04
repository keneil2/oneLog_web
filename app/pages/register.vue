<template>
  <AuthLayout>
    <UAuthForm
      class="w-full max-w-md"
      :schema="schema"
      title="Sign Up"
      description="Enter your credentails to access your account."
      :fields="fields"
      @submit="onSubmit"
      :submit="{
        label: 'Sign Up',
      }"
    >
    </UAuthForm>
  </AuthLayout>
</template>

<script lang="ts" setup>
import * as z from "zod";
import type { FormSubmitEvent, AuthFormField } from "@nuxt/ui";
import type { User } from "~/repositories/auth/auth";
const fields: Array<AuthFormField> = [
  {
    name: "email",
    type: "email",
    label: "Email",
    placeholder: "Enter your email",
    required: true,
  },
  {
    name: "password",
    type: "password",
    label: "Password",
    placeholder: "Enter your Password",
    required: true,
  },
  {
    name: "password_confirmation",
    type: "password",
    label: "Retype Password",
    placeholder: "Retype your Password",
    required: true,
  },
];
const schema = z
  .object({
    email: z.email("Invalid Email"),
    password: z
      .string("Password Required")
      .min(8, "Must be atleast 8 characters long"),
    password_confirmation: z.string("Password Required"),
  })
  .refine(
    (data) => {
      return data.password == data.password_confirmation;
    },
    {
      error: "Passwords don't match",
      path: ["password_confirmation"],
    },
  );

const { $auth } = useNuxtApp();
async function onSubmit(payload: FormSubmitEvent<User>) {
  await $auth.register(payload.data);
}
</script>
