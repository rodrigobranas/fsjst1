<script setup lang="ts">
import { reactive, ref, onMounted, inject } from 'vue';
import { useRouter } from 'vue-router';
import Board from '../domain/entity/Board';
import ServiceFactory from '../factory/ServiceFactory';
import NavbarComponent from '../components/NavbarComponent.vue';
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
	<NavbarComponent></NavbarComponent>
	<div class="boards">
		<h3>{{ $i18n.translate("Boards") }}</h3>
		<hr/>
		<div class="card card-body" v-for="board of state.boards">
			<div @click="openBoard(board)">{{ board.name }}</div>
		</div>
	</div>
</template>

<style>
.boards {
	padding: 20px;
}
.card {
	margin-bottom: 10px;
}
</style>