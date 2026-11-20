export type BillingCycle = {
  interval: string;
  frequency: number | null;
};

export type UnitPrice = {
  amount: string;
  currency_code: string | null;
};

export type SubscriptionPrice = {
  billing_cycle: BillingCycle;
  unit_price: UnitPrice;
};

export type CurrentSubscriptionResponse = {
  data: {
    subscription_name: string;
    price: SubscriptionPrice;
  };
};
