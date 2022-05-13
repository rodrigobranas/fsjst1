<script lang="ts">
import Board from "../domain/entity/Board";

export default {
	data() {
		return {
			columnName: "",
			board: new Board("Project A")
		}
	},
	mounted() {
		this.board.addColumn("Todo");
		this.board.addColumn("Doing");
		this.board.addColumn("Done");
	}
}
</script>

<template>
	<div>
		<h1>{{ board.name }}</h1>
		<br/>
		<ul>
			<li v-for="column in board.columns">
				{{ column.name }} <span @click="board.deleteColumn(column)">(delete)</span>
			</li>
		</ul>
		<br/>
		<input type="text" v-model="columnName"/>
		<button @click="board.addColumn(columnName)">Add</button>
	</div>
</template>

<style>
</style>