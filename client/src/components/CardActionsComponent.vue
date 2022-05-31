<script setup lang="ts">
defineProps(["column", "card"]);
</script>

<template>
	<div class="card-actions">
		<span class="decrease-estimative" @click="card.decreaseEstimative()"><span class="fa fa-minus"></span></span> 
		<span class="increase-estimative" @click="card.increaseEstimative()"><span class="fa fa-plus"></span></span>
		<span @click="column.deleteCard(card)"><span class="fa fa-trash"></span></span>
	</div>
</template>

<style>
.card-actions {
	padding: 10px;
}
.decrease-estimative {
	padding-right: 5px;
}
.increase-estimative {
	padding-right: 5px;
}
</style>