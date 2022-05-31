<script setup lang="ts">
import { useAuthStore } from '../store/AuthStore';

const authStore = useAuthStore();
</script>
<template>
	<div class="nav-bar">
		<div class="row">
			<div class="col-md-6">
				<h4>branas.io - FullStackJS</h4>
			</div>
			<div class="col-md-6 actions">
				<div class="logged-user">
					{{ authStore.session.username || 'username' }}
				</div>
				<div class="logout">
					<button class="btn btn-info" @click="authStore.logout()">Logout</button>
				</div>
			</div>
		</div>
	</div>
</template>

<style>
.nav-bar {
	background-color: #EEE;
	padding: 20px;
	width: 100%;
	margin-bottom: 10px;
}
.logged-user {
	display: inline-block;
	margin-right: 10px;
}
.logout {
	display: inline-block;
}
.actions {
	text-align: right;
}
</style>