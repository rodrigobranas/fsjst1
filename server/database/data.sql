insert into kanban.board (name) values ('Project b');
insert into kanban.column (id_board, name, has_estimative) values (2, 'Todo', true);
insert into kanban.column (id_board, name, has_estimative) values (2, 'Doing', true);
insert into kanban.column (id_board, name, has_estimative) values (2, 'Done', false);
insert into kanban.card (id_board, id_column, title, estimative) values (2, 4, 'A', 3);
insert into kanban.card (id_board, id_column, title, estimative) values (2, 4, 'B', 6);
insert into kanban.card (id_board, id_column, title, estimative) values (2, 4, 'C', 9);
insert into kanban.card (id_board, id_column, title, estimative) values (2, 4, 'D', 12);