import { createAuthRepository } from "~/repositories/auth/auth";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const toast = useToast();
  const api = $fetch.create({
    baseURL: "http://localhost/api",
    credentials: "include",
    onRequestError({ options }) {},
    onRequest({ response }) {},

    onResponseError({ response }) {
      toast.add({
        title: response._data?.title,
        description: response._data?.errors ? response._data?.errors[0][0] : response._data?.message,
        icon: "i-lucide-circle-alert",
        ui: {
          icon: "text-white",
        },
        progress: false,
        color: "error",
        close: {
          color: "error",
          variant: "outline",
          class: "rounded-full",
        },
      });
    },
  });
  return { provide: { auth: createAuthRepository(api) } };
});
