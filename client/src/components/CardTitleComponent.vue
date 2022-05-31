<script setup lang="ts">
defineProps(["title"]);
</script>
<template>
	<div class="card-component">
		<h6>{{ title }}</h6>
	</div>
</template>

<style>
.card-component {
	padding: 20px;
}
</style>