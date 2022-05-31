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
		<div class="row">
			<div class="col-md-2"></div>
			<div class="col-md-8">
				<h4>{{ column.name }}</h4>
				<div v-if="column.hasEstimative">
					<h6><span class="estimative">{{ column.getEstimative() }} hours</span></h6>
				</div>
				<div v-else>
					<h6>-</h6>
				</div>
			</div>
			<div class="col-md-2 text-right">
				<span class="delete-column" @click="board.deleteColumn(column)"><span class="fa fa-trash"></span></span>
			</div>
		</div>
		<hr />
		<slot></slot>
		<div class="new-card">
			<hr/>
			<input class="new-card-input form-control" type="text" v-model="newCard.title" @keyup.enter="board.addCard(column.name, newCard.title, 0)" placeholder="Title" />
		</div>
	</div>
</template>
<style scope>

.column {
	position: relative;
	display: inline-block;
	font-size: 14px;
	width: 300px;
	background-color: #FFF;
	min-height: 800px;
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
	width: 100%;
	padding: 10px;
	text-align: center;
}

.new-card input {
}
</style>