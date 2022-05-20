<script setup lang="ts">
defineProps(["column", "card"]);
</script>

<template>
	<span @click="column.deleteCard(card)">(x)</span>
</template>