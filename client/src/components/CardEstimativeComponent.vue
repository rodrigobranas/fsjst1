<script setup lang="ts">
defineProps(["column", "card"]);
</script>
<template>
	<div v-show="column.hasEstimative">
		{{ card.estimative }} 
		<span class="decrease-estimative" @click="card.decreaseEstimative()">(-)</span> 
		<span class="increase-estimative" @click="card.increaseEstimative()">(+)</span>
	</div>
</template>