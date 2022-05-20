<script setup lang="ts">
import BoardComponent from './components/BoardComponent.vue';
import NavbarComponent from './components/NavbarComponent.vue';
</script>

<template>
	<NavbarComponent></NavbarComponent>
	<div>
		<router-view></router-view>
	</div>
</template>

<style>
</style>
