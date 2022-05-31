<script setup lang="ts">
import { reactive, ref, onMounted, inject } from 'vue';
import Board from '../domain/entity/Board';
import ServiceFactory from '../factory/ServiceFactory';
import BoardComponent from '../components/BoardComponent.vue';
import NavbarComponent from '../components/NavbarComponent.vue';
import { useRoute, useRouter } from 'vue-router';
import DomainEvent from '../event/DomainEvent';

const state = reactive({ board: new Board(1, "") });

const route = useRoute();
const router = useRouter();

function back () {
	router.back();
}

onMounted(async () => {
	const serviceFactory = inject("serviceFactory") as ServiceFactory;
	const boardService = serviceFactory.createBoardService();
	const board = await boardService.getBoard(route.params.idBoard);
	board.on("moveCard", function (event: DomainEvent) {
		console.log("1", event);
	});
	board.on("addCard", function (event: DomainEvent) {
		boardService.addCard(board.idBoard, event.data.idColumn, event.data);
	});
	board.on("addColumn", function (event: DomainEvent) {
		console.log("3", event);
	});
	state.board = board;
});
</script>
<template>
	<NavbarComponent></NavbarComponent>
	<div class="board">
		<div @click="back()">Back</div>
		<h3>{{ state.board.name }}</h3>
		<h6><span id="estimative">{{ state.board.getEstimative() }}</span> hours</h6>
		<hr/>
		<BoardComponent :board="state.board"></BoardComponent>
	</div>
</template>

<style>
.board {
	padding: 20px;
}
</style>