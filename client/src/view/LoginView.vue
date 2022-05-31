<script setup lang="ts">
import { reactive } from 'vue';
import Credentials from '../domain/entity/Credentials';
import { useAuthStore } from '../store/AuthStore';

const credentials = reactive<Credentials>({ username: "", password: "" });

const authStore = useAuthStore();
</script>
<template>
	<div class="login">
		<div class="text-center">
			<h4>branas.io - FullStackJS</h4>
		</div>
		<br/>
		<div class="card card-body">
			<div class="form-group">
				<label>Username</label>
				<input class="form-control" type="text" v-model="credentials.username"/>
			</div>
			<div class="form-group">
				<label>Password</label>
				<input class="form-control" type="password" v-model="credentials.password"/>
			</div>
			<br/>
			<button class="btn btn-info" @click="authStore.login(credentials)">Login</button>
		</div>
	</div>
</template>

<style scoped>
.login {
	padding-top: 100px;
	width: 400px;
	margin-left: auto;
	margin-right: auto;
}
</style>