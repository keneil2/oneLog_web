import { useAuthStatus } from "~/composeables/authStatus";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStatus = useAuthStatus();
  const { $auth } = useNuxtApp();

  const response = await $auth.authVerification();
  authStatus.value = response.data.auth_status;

  if (!authStatus.value && to.path !== "/login") {
    return navigateTo("/login");
  }
});
