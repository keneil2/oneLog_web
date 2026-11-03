export default defineNuxtPlugin((nuxtApp)=>{
const config = useRuntimeConfig();
const api = $fetch.create({
    baseURL:"http://localhost:8080/api",
    credentials:"include",
    onRequestError({options}){
    },
    onRequest({response}){

    },

})
return {provide:{api}}
});