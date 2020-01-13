-- what do we want to know about owners?
create table owners(
    id serial primary key,
    name text,
    phone_number varchar(20)
    -- do owners have one and only one pet?
    -- or do they have many?
   -- pet_id integer references pets (id) :(

);
-- what do we want to know about pets?
create table pets(
    id serial primary key,
    name text,
    -- if you wanted to limit the number of characters, use this kind of field:
    -- varchar(50)
    -- "character varying"
    species varchar(100), 

    -- we can derive the age from a birthdate
    birthdate date,

    -- when you have the info in a another table, ask yourself:
    -- do pets have one owner?
    -- do pets have many owners?
    -- if pets have one and only one, then you put the foreign key
    -- right HERE
    owner_id integer references owners (id)
    -- the integer references the id in the table "owners"
);



-- chris will demo many-to-many
-- for many-to-many, use a "linking table"
create table pets_owner(
    -- this table needs no id
    owner_id integer references owners (id),
    pet_id integer references pets (id)
);