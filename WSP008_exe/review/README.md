# WSP007 Exercise

&nbsp;

## Notes

- No File Upload

  - delete `action="/XXXX" method="XXXX" enctype="multipart/form-data"`

  - method: "POST"

  - Object -> JSON.stringify(Object) -> req.body

  - header -> content-type: application/json

  - BE: `app.use(express.json())` -> can get data from `req.body()`

- With File Upload

- method: "POST"

- Content -> FormData -> body

- BE: formidable -> get data from `req.body`

&nbsp;

## Exercise 1

- [x] updated index.js

  - [x] add event to form (Submit Event)

  - [x] `preventDefault()`

  - [x] retrieve data from the form (content and image)

  - [x] create a FormData

  - [x] `formData.append(...)`, append content and image(file)

  - [x] fetch(...) -> create Request and get Response

  - [x] Request Body <- formData

  - [x] handle response

&nbsp;

## Exercise 2

- [x] ensure server router handler -> res.json(...)

- [x] updated index.js

  - [x] fetch(...) -> Request to server, get Response from server

  - [x] `resp.json()` -> data

  - [x] data -> htmlStr

  - [x] innerHTML = htmlStr

  - [x] delete html code

  - [x] if memo no image ???

  - [x] correct image

&nbsp;
