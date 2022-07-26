# Exercise 1

- [x] `yarn add knex pg @types/pg`
- [x] `yarn knex init -x ts`
- [x] fill in config file using dotenv 
- [x] try running knex query in a separate file
- [x] try integrating knex into services
  - [x] create memo knex services
  - [x] refactor controllers
  - [x] refactor server.ts


# Exercise 2

### Migrations

- [x] `yarn knex migrate:make <create-sth>`
- [x] `yarn knex migrate:up`
- [ ] `yarn knex migrate:down`
- [ ] `yarn knex migrate:latest`
- [ ] `yarn knex migrate:rollback`


### Seed
- [x] `yarn knex seed:make <create-sth>`
- [x] `yarn knex seed:run`