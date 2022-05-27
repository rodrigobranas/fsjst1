<script setup lang="ts">
import { reactive } from 'vue';
import Credentials from '../domain/entity/Credentials';
import { useAuthStore } from '../store/AuthStore';

const credentials = reactive<Credentials>({ username: "", password: "" });

const authStore = useAuthStore();
</script>
<template>
	Login
	{{ authStore.session }}
	<input type="text" v-model="credentials.username"/>
	<input type="password" v-model="credentials.password"/>
	<button @click="authStore.login(credentials)">Login</button>
</template>
