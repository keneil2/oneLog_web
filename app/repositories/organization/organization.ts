import type { $Fetch } from "#app";
import type { CreateOrganization } from "~/types/organization";
import type { ApiResponse } from "~/types/api";

export const createOrganizationRepository = (fetch: $Fetch) => {
  return {
    createOrganization: (organization:any) =>
      fetch<ApiResponse>("api/organization", { method: "POST", body: organization }),
    organizationExist:()=> fetch<ApiResponse<{exists:boolean}>>("api/organization/exists")
  };
};
