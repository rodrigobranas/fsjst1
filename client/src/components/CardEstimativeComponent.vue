<script setup lang="ts">
defineProps(["column", "card"]);
</script>
<template>
	<div class="card-estimative" v-show="column.hasEstimative">
		<h6>{{ card.estimative }} hours</h6>
	</div>
</template>

<style>
.card-estimative {
	padding: 10px;
}
</style>