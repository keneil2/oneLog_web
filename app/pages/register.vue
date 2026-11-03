<template>
<AuthLayout>
    <UAuthForm
    class="w-full max-w-md" 
:schema="schema"
title="Sign Up"
description="Enter your credentails to access your account."
:fields="fields"
@submit="onSubmit"
:submit="{
    label:'Sign Up'
}"

    >

    </UAuthForm>
</AuthLayout>
</template>

<script lang="ts" setup>
import * as z from 'zod';
import type { FormSubmitEvent, AuthFormField } from '@nuxt/ui';
const fields:Array<AuthFormField>=[{
    name:"email",
    type:"email",
    label:"Email",
    placeholder:"Enter your email",
    required:true
},
{
    name:'password',
    type:'password',
    label:'Password',
    placeholder:"Enter your Password",
    required:true
},
{
    name:'confirm_password',
    type:'password',
    label:'Retype_Password',
    placeholder:"Retype your Password",
    required:true
},];
const schema = z.object({
    email:z.email("Invalid Email"),
    password:z.string("Password Required").min(8,"Must be atleast 8 characters long"),
    confirm_password:z.string("Password Required")
}).refine((data)=>{
return data.password == data.confirm_password;
},{
    error:"Passwords don't match",
    path:["confirm_password"]
});;

type Schema = z.output<typeof schema>;
   
    function onSubmit(payload: FormSubmitEvent<Schema>){
    
    console.log(payload,"submitted");
   }

</script>