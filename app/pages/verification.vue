<template>
  <AuthLayout>
    <div aria-live="polite">
      <AuthStatusMessage v-bind="messages[linkStatus]">
        <UButton
          v-if="linkStatus === 'verified'"
          to="/onboarding"
          variant="solid"
          block
          trailing-icon="i-lucide-arrow-right"
          label="Continue to onboarding"
          :class="buttonClass"
        />

        <template v-else-if="linkStatus === 'expired' || linkStatus === 'broken'">
          <UButton
            variant="solid"
            block
            trailing-icon="i-lucide-arrow-right"
            label="Send a new link"
            :class="buttonClass"
            @click="resendVerificationEmail"
          />

          <p class="text-center text-[13px] text-muted">
            Already verified?
            <NuxtLink to="/login" class="auth-link font-medium">Sign in</NuxtLink>
          </p>
        </template>

        <template v-else-if="linkStatus === 'error'">
          <UButton
            variant="solid"
            block
            trailing-icon="i-lucide-rotate-cw"
            label="Try again"
            :class="buttonClass"
            @click="verifyEmail"
          />

          <UButton
            variant="outline"
            block
            trailing-icon="i-lucide-mail"
            label="Resend email"
            class="h-11 justify-between rounded-[5px] text-sm font-semibold active:translate-y-px"
            @click="resendVerificationEmail"
          />
        </template>
      </AuthStatusMessage>
    </div>
  </AuthLayout>
</template>

<script lang="ts" setup>
type LinkStatus = "pending" | "verified" | "expired" | "broken" | "error";

type StatusMessage = {
  icon?: string;
  tone: "neutral" | "primary" | "warning" | "error";
  title: string;
  description: string;
  logTag: string;
  logText: string;
};

const messages: Record<LinkStatus, StatusMessage> = {
  pending: {
    tone: "neutral",
    title: "Verifying your email",
    description: "This only takes a moment.",
    logTag: "WAIT",
    logText: "email.verify status=pending",
  },
  verified: {
    icon: "i-lucide-check",
    tone: "primary",
    title: "Email verified",
    description: "Your account is ready. Head to your dashboard to get started.",
    logTag: "INFO",
    logText: "email.verify status=ok",
  },
  expired: {
    icon: "i-lucide-clock",
    tone: "warning",
    title: "This link has expired",
    description: "It may be too old or incomplete. We can send you a new one.",
    logTag: "WARN",
    logText: "email.verify link=invalid",
  },
  broken: {
    icon: "i-lucide-link-2-off",
    tone: "warning",
    title: "This link is incorrect",
    description: "The URL you followed is incorrect. We can send you a new verification email.",
    logTag: "WARN",
    logText: "email.verify link=missing",
  },
  error: {
    icon: "i-lucide-server-crash",
    tone: "error",
    title: "Something went wrong",
    description: "The server was down for this try. Please try again. If the issue persists, contact administration or resend the email.",
    logTag: "ERROR",
    logText: "email.verify status=error",
  },
};

const buttonClass = "h-11 justify-between rounded-[5px] text-sm font-semibold shadow-lg shadow-primary/20 active:translate-y-px";

const { $auth } = useNuxtApp();
const route = useRoute();
const linkStatus = ref<LinkStatus>("pending");

async function verifyEmail() {
  const url = route.query.verification_url as string | undefined;

  if (url === undefined) {
    linkStatus.value = "broken";
    return;
  }

  linkStatus.value = "pending";
  await $auth
    .emailVerification(url)
    .then(() => {
      linkStatus.value = "verified";
    })
    .catch((error) => {
      linkStatus.value = error.status === 403 ? "expired" : "error";
    });
}

function resendVerificationEmail() {
  // TODO: call the resend endpoint once it is decided.
}

onMounted(async () => await verifyEmail());
</script>
