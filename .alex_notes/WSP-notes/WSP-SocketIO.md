# SocketIO

There are 4 modes of communication between server and client for the SocketIO.

## Mode 1: Server side broadcast

向所有 connecting client 發送

```ts
// server side
app.post("/users", (req, res) => {
  // Business logic here
  io.emit("new-user", "Congratulations! New User Created!");
  res.json({ updated: 1 });
});
```

## Mode 2: Server side to Specific Socket

發送到特定 client

```ts
// server side
io.on("connection", function (socket) {
  // This socket is the specific socket
  socket.emit("hello", { msg: "Hello Client" });
});
```

```js
// client side
socket.on("hello", (data) => {
  // data has the content {msg:"Hello Client"}
  console.log(data);
});
```

## Mode 3: Server side to Specific Room

let the client into "room" and specific emit to room client

```ts
io.on("connection", function (socket) {
  // This socket is the specific socket
  if (someCondition) {
    // Based on some condition
    socket.join("room-name");
  }
});

app.post("/user", (req, res) => {
  io.to(`room-name`).emit("new-user", "Congratulations! New User Created!");
  res.json({ updated: 1 });
});
```

## Mode 4: Client side to Server

```js
const socket = io.connect("localhost:8080");
socket.emit("hello", { msg: "Hello Server" });
```

```ts
socket.on("hello", (data) => {
  // data has the content {msg:"Hello Client"}
});
```
