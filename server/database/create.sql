create schema kanban;

create table kanban.board (
	id_board serial primary key,
	name text not null
);

create table kanban.column (
	id_column serial primary key,
	id_board integer references kanban.board (id_board),
	name text not null,
	has_estimative boolean not null default false
);

create table kanban.card (
	id_card serial primary key,
	id_board integer references kanban.board (id_board),
	id_column integer references kanban.column (id_column),
	title text not null,
	estimative integer not null
);

create table kanban.transition (
	id_transition serial primary key,
	id_card integer references kanban.card (id_card),
	id_column integer references kanban.column (id_column),
	date timestamp not null default now()
);

insert into kanban.board (name) values ('Project A');
insert into kanban.column (id_board, name, has_estimative) values (1, 'Todo', true);
insert into kanban.column (id_board, name, has_estimative) values (1, 'Doing', true);
insert into kanban.column (id_board, name, has_estimative) values (1, 'Done', false);
insert into kanban.card (id_board, id_column, title, estimative) values (1, 1, 'A', 3);
insert into kanban.card (id_board, id_column, title, estimative) values (1, 1, 'B', 6);
insert into kanban.card (id_board, id_column, title, estimative) values (1, 1, 'C', 9);
insert into kanban.card (id_board, id_column, title, estimative) values (1, 1, 'D', 12);
