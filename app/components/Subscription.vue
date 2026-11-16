<template>
  <div class="flex flex-col gap-8 text-highlighted">
    <header class="flex flex-col items-center gap-2.5 text-center">
      <h1 class="text-[34px] leading-[1.1] font-semibold tracking-[-0.035em]">Choose your plan</h1>
      <p class="text-[15px] text-muted">
        Start free and upgrade when you need more. You can change plans any time.
      </p>
    </header>

    <div class="grid gap-3 rounded-[5px] border border-default p-3 sm:grid-cols-2 lg:grid-cols-3">
      <template v-for="plan in plans" :key="plan.plan_details.id">
        <PayMentCard
          :name="plan.plan_details.name"
          :amount="plan.price.amount"
          :features="plan.plan_details.plan_feature.map((f) => ({ name: f.feature.name, quota_amount: f.quota_amount }))"
          :highlighted="plan.plan_details.slug === 'pro'"
          @select="selectPlan(plan)"
        />
      </template>
    </div>

    <p class="text-center text-[13px] text-muted">
      No credit card needed for Free. Not sure yet?
      <NuxtLink to="/dashboard" class="auth-link font-medium">Skip and decide later</NuxtLink>
    </p>
  </div>
</template>

<script lang="ts" setup>
type Plan = {
  plan_details: {
    id: number;
    name: string;
    slug: string;
    paddle_id: string;
    plan_feature: Array<{
      id: number;
      quota_amount: number;
      feature: { id: number; name: string; type: string; unit: string };
    }>;
  };
  price: { amount: string; currency_code: string };
  price_id:string
};

type SubscriptionPricesResponse = {
  success: boolean;
  message: string;
  data: { plans: Plan[] };
};

const { $subscription } = useNuxtApp();
const plans = ref<Plan[]>([]);
const emit =defineEmits();
function selectPlan(plan: Plan) {
emit("checkout");
  const {$paddle}= useNuxtApp();
  console.log(plan);
$paddle.Checkout.open({
items:[
{
priceId:plan.price_id,
quantity:1
}
]
});

}

onMounted(async () => {
  const response = (await $subscription.getSubcriptions()) as SubscriptionPricesResponse;
  plans.value = response.data.plans;
});
</script>
