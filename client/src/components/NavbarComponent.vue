<script setup lang="ts">
import { useAuthStore } from '../store/AuthStore';

const authStore = useAuthStore();
</script>
<template>
	<div class="navbar">
		<div class="navbar-brand">
			branas.io - FullStackJS
		</div>
		<button class="btn btn-info" @click="authStore.logout()">Logout</button>
	</div>
</template>

<style>
.navbar {
	background-color: #EEE;
	padding: 20px;
	margin-bottom: 10px;
}
</style>