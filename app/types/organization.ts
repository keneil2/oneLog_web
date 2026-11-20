export type CreateOrganization = {
  name: string | undefined;
  icon: File | undefined;
  type: string;
  billing_address: string | undefined | null;
};