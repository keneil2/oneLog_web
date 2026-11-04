<template> 
<AuthLayout>
<UAuthForm 
class="w-full max-w-md" 
:schema="schema"
title="Login"
description="Enter your credentails to access your account."
:fields="fields"
@submit="onSubmit"
:submit="{
    label:'Login'
}"
>
</UAuthForm>

</AuthLayout>

</template>

<script lang="ts" setup>
import * as z from 'zod';
import type { FormSubmitEvent, AuthFormField } from '@nuxt/ui'
import type { User } from '~/repositories/auth/auth';
const fields: Array<AuthFormField>=[{
    name:'email',
    type:"email", 
   label:"Email",
   placeholder:"Enter your email", 
   required:true
   }, 
   {
    name:"password",
    type:"password",
    label:"Password",
    placeholder: "Enter you password",
    required: true 
}
   ];
  const {$auth} = useNuxtApp();
   const schema = z.object(
    {
    email:z.email("Invalid email"),
    password: z.string("Password is required").min(8,"Must be at least 8 characters")
   });
   

   async function onSubmit(payload: FormSubmitEvent<User>){
    const response = await $auth.login(payload.data);
    console.log(response);   
}

</script>
