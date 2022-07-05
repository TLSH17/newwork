# WSP008 Exercise

&nbsp;

## Exercise 1

- [x] cerate `memoRoutes.ts`

- [x] use `express.Router()` to create `memoRoutes`

- [x] attach routes to `memoRoutes`

  - [x] may need to modify path

- [x] import `memoRoutes` in `server.ts`

- [x] attach router to app (`app.use(...)`)

&nbsp;

## Exercise 2

- [x] add json file to present user <-> memo

- [x] Add a new page called `like_memos.html` in your protected static folder.

- [x] We are going to pass the id of that specific user using query string.

```text
http://localhost:8080/like_memos.html?id=1

```

- [ ] get id from URL (`URLSearchParams`)

- [ ] fetch

  - [ ] (BE) memoRoutes add new Route

  - [ ] (BE) get user id from params/query string

  - [ ] (BE) retrieve data from json file

  - [ ] (BE) response (`res.json(data)`)

  - [ ] (FE) fetch(...)

  - [ ] (FE) get response -> `resp.json()`
