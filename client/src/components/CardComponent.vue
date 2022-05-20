<script setup lang="ts">
import Board from '../domain/entity/Board';
import Card from '../domain/entity/Card';
import Column from '../domain/entity/Column';

defineProps({
	"board": {
		type: Board,
		required: true
	},
	"column": {
		type: Column,
		required: true
	},
	"card": {
		type: Card,
		required: true
	}
});
</script>
<template>
	<div class="card" draggable="true" @dragstart="board.selectCard(column, card)" @dragend="board.resetCard()" @dragover="board.swap(card)">
		<slot></slot>
	</div>
</template>

<style scoped>
.card {
	width: 100px;
	background-color: #FFF;
	margin-bottom: 5px;
	border: 1px solid #000;
}
</style>