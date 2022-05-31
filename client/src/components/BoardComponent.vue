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
		<input id="new-column-input" class="form-control" type="text" v-model="columnName" placeholder="Column Name"/>
		<button id="new-column-button" class="btn btn-info" @click="board.addColumn(undefined, columnName)">Add</button>
		<br/>
		<ColumnComponent :board="board" :column="column" v-for="column in board.columns" @dragover="board.moveTo(column)">
			<div v-for="card in column.cards">
				<CardComponent :board="board" :column="column" :card="card" :style="{ 'background-color': card.color }">
					<CardTitleComponent :title="card.title"></CardTitleComponent>
					<br/>
					<div class="row">
						<div class="col-md-6">
							<CardEstimativeComponent :column="column" :card="card"></CardEstimativeComponent>
						</div>
						<div class="col-md-6 text-right">
							<CardActionsComponent :column="column" :card="card"></CardActionsComponent>
						</div>
					</div>
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

#new-column-input {
	display: inline-block;
	vertical-align: top;
	width: 200px;
	margin-bottom: 20px;
	margin-right: 10px;
}
</style>