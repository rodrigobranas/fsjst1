<script setup lang="ts">
import { useAuthStore } from '../store/AuthStore';

const authStore = useAuthStore();
</script>
<template>
	username: {{ authStore.session.username }}<br/>
	token: {{ authStore.session.token }}<br/>
	<router-link to="/boards">boards</router-link><br/>
	<router-link to="/login">login</router-link><br/>
	<a href="#" @click="$i18n.setLanguage('en')">English</a>
	<a href="#" @click="$i18n.setLanguage('pt')">Portuguese</a>
	<button @click="authStore.logout()">Logout</button>
</template>