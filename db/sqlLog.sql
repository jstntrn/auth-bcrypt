create table clients (
    id serial primary key,
    name varchar,
    email varchar,
    hash varchar,
    is_admin boolean
)