# WSP006 Exercise

&nbsp;

## Form

- No file -> `URLEncoded`

**FE**

```html
<form action="XXX" method="POST">...</form>
```

**BE**

```ts
app.use(express.urlencoded(...))

```

- With file -> `Multi-part FormData`

**FE**

```html
<form action="XXX" method="POST" enctype="multipart/form-data">...</form>
```

**BE**

- formidable

&nbsp;

## Todo

- [x] init npm project

- [x] init TS with express

- [x] create public folder

- [x] copy `html`, `css` from WSP005 Exercise

- [x] serve public folder

```ts
app.use(express.static(...))

```

- [x] configure `index.html` form (support multi-part form data)

- [x] install formidable

- [x] formidable setup

- [x] `form.parse` to process upload-file request

- [x] `{fields, file}` -> memo info -> `.json`

  - [x] read jsonfile

  - [x] get info from `{fields, file}`, create new memo object

  - [x] get arr from jsonfile, push new memo

  - [x] writeFile -> save as json file

- [x] create a route -> get all memo data

&nbsp;

## Exercise 2

- [x] configure login form (enctype??)

- [x] configure server

  - [x] configure express to support urlencoded

  - [x] install and setup express-session

  - [x] read user input username and password from `req.body`

  - [x] read user json data, check if input info is valid

  - [x] if not valid, redirect `/`

  - [x] if valid, updated `req.session` and redirect `admin.html`

- [x] `admin.html` should be protected

- [x] Guard Middleware

  - [x] check `req.session`

&nbsp;
