<template>
  <AuthLayout>
    <div aria-live="polite">
      <!-- Verifying -->
      <div v-if="linkStatus === 'pending'" class="flex flex-col gap-5">
        <div class="flex size-10 items-center justify-center rounded-[10px] border border-default bg-neutral-950 text-primary">
          <Spinner class="size-5" />
        </div>

        <header class="flex flex-col gap-2.5">
          <h1 class="text-[34px] leading-[1.1] font-semibold tracking-[-0.035em]">
            Verifying your email
          </h1>
          <p class="text-[15px] text-muted">This only takes a moment.</p>
        </header>

        <div class="flex items-center gap-2.5 rounded-[9px] border border-default bg-neutral-950 px-3 py-2.5 font-mono text-xs">
          <span class="rounded bg-elevated px-1.5 py-0.5 text-[10px] leading-none font-bold text-toned">WAIT</span>
          <span>email.verify status=pending</span>
        </div>
      </div>

      <!-- Verified -->
      <div v-else-if="linkStatus === 'verified'" class="flex flex-col gap-5">
        <div class="flex size-10 items-center justify-center rounded-[10px] border border-primary/30 bg-primary/10 text-primary">
          <UIcon name="i-lucide-check" class="size-5" />
        </div>

        <header class="flex flex-col gap-2.5">
          <h1 class="text-[34px] leading-[1.1] font-semibold tracking-[-0.035em]">
            Email verified
          </h1>
          <p class="text-[15px] text-muted">
            Your account is ready. Head to your dashboard to get started.
          </p>
        </header>

        <div class="flex items-center gap-2.5 rounded-[9px] border border-default bg-neutral-950 px-3 py-2.5 font-mono text-xs">
          <span class="rounded bg-primary/15 px-1.5 py-0.5 text-[10px] leading-none font-bold text-primary">INFO</span>
          <span>email.verify status=ok</span>
        </div>

        <UButton
          to="/dashboard"
          variant="solid"
          block
          trailing-icon="i-lucide-arrow-right"
          label="Continue to dashboard"
          class="h-11 justify-between rounded-[9px] text-sm font-semibold shadow-lg shadow-primary/20 active:translate-y-px"
        />
      </div>

      <!-- Expired or invalid -->
      <div v-else class="flex flex-col gap-5">
        <div class="flex size-10 items-center justify-center rounded-[10px] border border-warning/30 bg-warning/10 text-warning">
          <UIcon name="i-lucide-clock" class="size-5" />
        </div>

        <header class="flex flex-col gap-2.5">
          <h1 class="text-[34px] leading-[1.1] font-semibold tracking-[-0.035em]">
            This link has expired
          </h1>
          <p class="text-[15px] text-muted">
            It may be too old or incomplete. We can send you a new one.
          </p>
        </header>

        <div class="flex items-center gap-2.5 rounded-[9px] border border-default bg-neutral-950 px-3 py-2.5 font-mono text-xs">
          <span class="rounded bg-warning/15 px-1.5 py-0.5 text-[10px] leading-none font-bold text-warning">WARN</span>
          <span>email.verify link=invalid</span>
        </div>

        <UButton
          variant="solid"
          block
          trailing-icon="i-lucide-arrow-right"
          label="Send a new link"
          class="h-11 justify-between rounded-[9px] text-sm font-semibold shadow-lg shadow-primary/20 active:translate-y-px"
        />

        <p class="text-center text-[13px] text-muted">
          Already verified?
          <NuxtLink to="/login" class="auth-link font-medium">Sign in</NuxtLink>
        </p>
      </div>
    </div>
  </AuthLayout>
</template>

<script lang="ts" setup>
import Spinner from '~/components/Spinner.vue';
const { $auth } = useNuxtApp();
const route = useRoute();
 const status = ref<boolean>(false);
  const fecthing = ref <boolean>(true);
async function verifyEmail() {
  const url = route.query?.verification_url  as string; 
  if(url == ''){
   
  }
   await $auth.authVerification(url).then((res)=>{
fecthing.value=false;
    console.log("this is STATUS", res)
     status.value= true;
   }).catch((error)=>{
    fecthing.value=false;
     status.value = false;
  console.log("error",error.status)
   })
}
const linkStatus = computed(()=>{
   if(status.value == true && fecthing.value == false){
  return "verified";
   } else if(status.value == false && fecthing.value == false){
      return "invalid";
   }
   return "pending"

})

 onMounted(async ()=> await verifyEmail());
</script>
