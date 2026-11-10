<template>
  
<NuxtLink  @click="logout"></NuxtLink>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import Spinner from '~/components/Spinner.vue';
onMounted( async ()=>{
    // testing authentication
const { $auth } = useNuxtApp();
await $auth.login_test();
});

function logout(){

}
</script>