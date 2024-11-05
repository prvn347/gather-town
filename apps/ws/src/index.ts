import { WebSocketServer } from "ws";
import { User } from "./user";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", function connection(ws) {
  const user = new User(ws);
  ws.send("hello");
  ws.on("error", console.error);

  ws.on("close", (e) => {
    user == null;
  });
});

console.log("connected to web socket at 8080");
