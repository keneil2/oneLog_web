import { useAuthStatus } from "~/composeables/authStatus";

export default defineNuxtRouteMiddleware(async () => {
  const authStatus = useAuthStatus();
  const { $auth } = useNuxtApp();

  // not known to be logged in: ask the api.
  // a 401 is redirected to /login by the handler in plugins/api.client.ts
  if (!authStatus.value) {
    await $auth.authVerification().catch(() => {});
  }
});
