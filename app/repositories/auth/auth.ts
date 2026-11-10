import type { $Fetch } from "#app";
import type { FormSubmitEvent } from "@nuxt/ui";

export interface User {
  email: string;
  password: string;
  password_confirmation?: string;
}

export const createAuthRepository = (fetch: $Fetch) => {
  const setCSRFToken = async () => await fetch("/sanctum/csrf-cookie");

  return {

    
    register: async (user: User) =>
      await setCSRFToken().then(() =>
        fetch("/api/register", { method: "POST", body: user }),
      ),
      
    
    login: async (user: User) => {
      const {push,currentRoute}=useRouter();
      await setCSRFToken().then(async () => {
       await fetch("/api/login", { method: "POST", body: user });
         const redirect  = currentRoute.value.query.redirect;
        
         push(redirect as string | undefined ?? "dashboard");
      });
    },
    logout:()=>{
    const {push}=useRouter();
      fetch("/api/logout").then(()=>{
        push("/login")
      });
      
    },
    
    login_test:() => fetch("/api/auth-test"),
    authVerification: (url: string) => fetch(url),
  };
};
