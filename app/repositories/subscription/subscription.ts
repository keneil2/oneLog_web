import type { $Fetch } from "#app";
import type { CurrentSubscriptionResponse } from "~/types/subscription";

export const createSubcriptionReposity= (fetch:$Fetch)=>{
return {
  getSubcriptions:() => fetch("api/subscription/prices"),
  getUserSubscription:() => fetch<CurrentSubscriptionResponse>("api/subscription/current"),

}
}
