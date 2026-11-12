import type { $Fetch } from "#app";

export const createSubcriptionReposity= (fetch:$Fetch)=>{
return {
  getSubcriptions:() => fetch("api/subscription/prices")
}
}
