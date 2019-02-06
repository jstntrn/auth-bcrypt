insert into clients ( name, email, hash )
values ($1, $2, $3)
returning *