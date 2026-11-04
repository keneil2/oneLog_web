import type { $Fetch } from "#app";
import type { FormSubmitEvent } from "@nuxt/ui";

export interface User {
  email: string;
  password: string;
  password_confirmation?: string;
}

 export const createAuthRepository = (fetch: $Fetch) => {
  return {
    register: (user: User) =>
      fetch("/register", { method: "POST", body: user }),
    login: (user:User) => 
        fetch("/login", { method: "POST", body: user }),
  };
};
