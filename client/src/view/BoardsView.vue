<script setup lang="ts">
import { reactive, ref, onMounted, inject } from 'vue';
import { useRouter } from 'vue-router';
import Board from '../domain/entity/Board';
import ServiceFactory from '../factory/ServiceFactory';
const state = reactive<{ boards: Board[] }>({ boards: [] });

defineProps(["username"]);

const router = useRouter();

function openBoard (board: Board) {
	router.push({ path: `/boards/${board.idBoard}` });
}

onMounted(async () => {
	const serviceFactory = inject("serviceFactory") as ServiceFactory;
	const boards = await serviceFactory.createBoardService().getBoards();
	state.boards = boards;
});
</script>
<template>
	{{ username }}
	<div v-for="board of state.boards">
		<!-- <router-link :to="{ path: `/boards/${board.idBoard}` }">{{ board.name }}</router-link> -->
		<div @click="openBoard(board)">{{ board.name }}</div>
	</div>
</template>
