<script setup lang="ts">
defineProps(["column", "card"]);
</script>
<template>
	<div v-show="column.hasEstimative">
		{{ card.estimative }} <span @click="card.decreaseEstimative()">(-)</span> <span
			@click="card.increaseEstimative()">(+)</span>
	</div>
</template>