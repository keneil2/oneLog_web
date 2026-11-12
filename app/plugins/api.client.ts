import { createAuthRepository } from "~/repositories/auth/auth";
import { createSubcriptionReposity } from "~/repositories/subscription/subscription";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const toast = useToast();
  const api = $fetch.create({
    baseURL: "http://localhost",
    credentials: "include",
    headers: { accept: "application/json" },
    onRequestError({ options }) {},
    onRequest({ request, options }) {
      const token = useCookie("XSRF-TOKEN").value;
      if (token) {
        options.headers.set("X-XSRF-TOKEN", token);
      }
    },

    onResponseError({ response }) {
      toast.add({
        title: response._data?.title || "Unknown Error",
        description: response._data?.errors
          ? response._data?.errors[0][0]
          : response._data?.message,
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

      if (response.status == 401) {
        const router = useRouter();
        router.push({
          path: "/login",
          query: { redirect: router.currentRoute.value.fullPath },
        });
      }
    },
  });
  return { provide: { auth: createAuthRepository(api),subscription:createSubcriptionReposity(api) } };
});
