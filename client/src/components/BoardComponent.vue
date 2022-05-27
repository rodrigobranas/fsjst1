<script setup lang="ts">
import { inject, onMounted, reactive, ref } from 'vue';
import Board from '../domain/entity/Board';
import ServiceFactory from '../factory/ServiceFactory';
import ColumnComponent from './ColumnComponent.vue';
import CardComponent from './CardComponent.vue';
import CardTitleComponent from './CardTitleComponent.vue';
import CardEstimativeComponent from './CardEstimativeComponent.vue';
import CardActionsComponent from './CardActionsComponent.vue';

defineProps({
	board: {
		type: Board,
		required: true
	}
});

const columnName = ref("");

</script>

<template>
	<div>
		<div class="board-header">
			<div class="board-header-item">
				<span>{{ board.name }}</span>
			</div>
			<div class="board-header-item">
				<span id="estimative">{{ board.getEstimative() }}</span> hours
			</div>
			<div class="board-header-item">
				<input id="new-column-input" type="text" v-model="columnName" placeholder="Column Name"/>
				<button id="new-column-button" @click="board.addColumn(undefined, columnName)">Add</button>
			</div>
		</div>
		<br/>
		<ColumnComponent :board="board" :column="column" v-for="column in board.columns" @dragover="board.moveTo(column)">
			<div v-for="card in column.cards">
				<CardComponent :board="board" :column="column" :card="card" :style="{ 'background-color': card.color }">
					<CardActionsComponent></CardActionsComponent>
					<br/>
					<CardEstimativeComponent :column="column" :card="card"></CardEstimativeComponent>
					<br/>
					<CardTitleComponent :title="card.title"></CardTitleComponent>
				</CardComponent>
			</div>
		</ColumnComponent>
	</div>
</template>

<style scoped>

.board-header {
	display: flex;
	flex-direction: row;
}

.board-header-item {
	width: 200px;
	background-color: #EEE;
	border: 1px solid #000;
}
</style>