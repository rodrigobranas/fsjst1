<script setup lang="ts">
import { inject, onMounted, reactive, ref } from 'vue';
import Board from '../domain/entity/Board';
import Card from '../domain/entity/Card';
import ServiceFactory from '../factory/ServiceFactory';

const state = reactive({ board: new Board("") });

const columnName = ref("");
const newCard = reactive<Card>(new Card("", 0));

onMounted(async () => {
	const serviceFactory = inject("serviceFactory") as ServiceFactory;
	const board = await serviceFactory.createBoardService().getBoard(1);
	state.board = board;
});

</script>

<template>
	<div>
		<h3>{{ state.board.name }}</h3>
		{{ state.board.getEstimative() }}
		<br/>
		<div class="column" v-for="column in state.board.columns">
			{{ column.name }} <span @click="state.board.deleteColumn(column)">(x)</span>
			<br/>
			<div v-show="column.hasEstimative">
				{{ column.getEstimative() }}
			</div>
			<hr/>
			<div class="card" v-for="card in column.cards">
				{{ card.title }} <span @click="column.deleteCard(card)">(x)</span>
				<br/>
				<div v-show="column.hasEstimative">
					{{ card.estimative }} <span @click="card.decreaseEstimative()">(-)</span> <span @click="card.increaseEstimative()">(+)</span>
				</div>
			</div>
			<div class="new-card">
				<input type="text" v-model="newCard.title" @keyup.enter="column.addCard(newCard.title, 0)" placeholder="Title"/>
			</div>
		</div>
		<br/>
		<input type="text" v-model="columnName"/>
		<button @click="state.board.addColumn(columnName)">Add</button>
	</div>
</template>

<style>
.column {
	display: inline-block;
	font-size: 14px;
	width: 110px;
	background-color: #EEE;
	min-height: 200px;
	border: 1px solid #000;
	text-align: center;
	margin-right: 1px;
	vertical-align: top;
	padding: 2px;
}

.card {
	width: 100px;
	background-color: #FFF;
	margin-bottom: 5px;
	border: 1px solid #000;
}

.new-card {
	width: 100px;
	margin-bottom: 5px;
	text-align: center;
}

.new-card input {
	width: 90px;
	margin-bottom: 5px;
}
</style>