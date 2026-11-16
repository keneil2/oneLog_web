import {initializePaddle} from "@paddle/paddle-js"
export default defineNuxtPlugin(async()=>{
const config = useRuntimeConfig();

const paddle = await initializePaddle({
environment: config.public.paddleEnv as "sandbox" | "production",
token: config.public.paddleClientToken,
eventCallback:(event)=>{
  if(event.name == "checkout.completed"){
    navigateTo("/thank-you");
  }
}}); 
return {provide:{paddle}}
})
