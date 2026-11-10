<template>
  <AuthLayout>
    <div aria-live="polite">
      <AuthStatusMessage
        icon="i-lucide-mail"
        tone="primary"
        title="Check your inbox"
        log-tag="INFO"
        :log-text="`email.send to=${email}`"
      >
        <template #description>
          We sent a verification link to
          <span class="font-semibold text-highlighted">{{ email }}</span>. Click it to finish setting up your account.
        </template>

        <UButton
          variant="solid"
          block
          label="Resend email"
          class="h-11 rounded-[5px] text-sm font-semibold shadow-lg shadow-primary/20 active:translate-y-px"
          @click="resendVerificationEmail"
        />

        <div class="text-center text-[13px] text-muted">
          <p>Can't find it? Check your spam folder.</p>
          <p>
            Wrong email?
            <NuxtLink to="/register" class="auth-link font-medium">Change it</NuxtLink>
          </p>
        </div>
      </AuthStatusMessage>
    </div>
  </AuthLayout>
</template>

<script lang="ts" setup>
const route = useRoute();
const email = route.query.email as string | undefined;

function resendVerificationEmail() {
  // TODO: call the resend endpoint once it is decided.
}
</script>
