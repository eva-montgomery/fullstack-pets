-- what do we want to know about pets?
create table pets(
    id serial primary key,
    name text,
    -- if you wanted to limit the number of characters, use this kind of field:
    -- varchar(50)
    
);


-- what do we want to know about owners?
create table owners(
    id serial primary key,

);