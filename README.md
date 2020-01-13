# How to backend + postgres

## Set up npm project


```
npm init -y
```

## Set the database


```
createdb fullstack-pets
touch schema.sql
touch seed.sql
```

### Put stuff in `schema.sql` and in `seed.sql`

- find the nouns, create tables for each
- describe the columns for each kind of thing


### get the names of all pet owners
```select name from owners;```

### get the names and species of all pets
```select name, species from pets```
```select species, name from pets```

### get all the pets for owner id 2
```select * from pets where owner_id=2;```

### bonus: get all the pets' names and birthdates for owner ids 1 or 2
```select name, birthdate from pets where owner_id in (1, 2);```
```select name, birthdate from pets where owner_id=1 or owner_id=2;```

### subqueries
### redo the bonus with a subquery
```
select name, birthdate from pets where owner_id in 
	(select id from owners
);
```
	
### get me the pet names where the owner name is "chris"
```
select name from pets where owner_id=(
	select id from owners where name='chris'
);
```
		

	
