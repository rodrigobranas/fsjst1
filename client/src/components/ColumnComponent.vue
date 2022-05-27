<script setup lang="ts">
import { reactive } from 'vue';
import Board from '../domain/entity/Board';
import Card from '../domain/entity/Card';
import Column from '../domain/entity/Column';
import CardComponent from './CardComponent.vue';

defineProps({
	"board": {
		type: Board,
		required: true
	},
	"column": {
		type: Column,
		required: true
	}
});

const newCard = reactive<Card>(new Card("", 0));
</script>
<template>
	<div class="column">
		{{ column.name }} <span class="delete-column" @click="board.deleteColumn(column)">(x)</span>
		<br />
		<div v-if="column.hasEstimative">
			<span class="estimative">{{ column.getEstimative() }}</span>
		</div>
		<div v-else>
			-
		</div>
		<hr />
		<slot></slot>
		<div class="new-card">
			<hr/>
			<input class="new-card-input" type="text" v-model="newCard.title" @keyup.enter="board.addCard(column.name, newCard.title, 0)" placeholder="Title" />
		</div>
	</div>
</template>
<style scope>

.column {
	position: relative;
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
	padding-bottom: 50px;
}

.new-card {
	position: absolute;
	bottom: 0;
	width: 100px;
	margin-bottom: 5px;
	text-align: center;
}

.new-card input {
	width: 100%;
	margin-bottom: 5px;
}
</style>