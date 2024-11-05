import WebSocket from "ws";
import { joinPayload, movementPayload } from "@repo/types/dist/ws";
import { RoomManager } from "./room";
import { ps } from "@repo/db/client";

import jwt, { JwtPayload } from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { json } from "express";
function getRandomString() {
  const uniqueKey = uuidv4();
  return uniqueKey;
}
export class User {
  id: string;
  spaceId: string;
  x?: number;
  userId?: string;
  y?: number;
  constructor(private ws: WebSocket) {
    console.log("inside constructor");
    this.id = getRandomString();
    this.spaceId = "id";
    this.userId = "userid";
    this.initHandler();
  }

  initHandler() {
    console.log("under inti");
    this.ws.on("message", (data: string) => {
      console.log("under intit");
      const message = JSON.parse(data);
      console.log(message);
      const type = message.type;
      const payload = message.payload;

      switch (type) {
        case "join":
          this.joinRoom(payload);
          break;
        case "move":
          this.broadcastMovement(payload);
          break;
      }
    });
  }

  public async joinRoom(payload: joinPayload) {
    console.log("under joined room");
    const spaceId = payload.spaceId;
    this.spaceId = spaceId;
    const space = await ps.space.findFirst({ where: { id: spaceId } });
    if (!space) {
      this.ws.close();
      return;
    }
    const user = jwt.verify(payload.token, "pravin") as JwtPayload;
    this.userId = user.userId;

    RoomManager.getInstance().addUser(spaceId, this);
    //db interaction

    this.x = Math.floor(Math.random() * space.width);
    this.y = Math.floor(Math.random() * space.height);
    const message = JSON.stringify({
      type: "space-joined",
      payload: {
        spawn: {
          x: this.x,
          y: this.y,
        },
        users:
          RoomManager.getInstance()
            .rooms.get(spaceId)
            ?.filter((x) => x.id !== this.id)
            ?.map((u) => ({ id: u.id })) ?? [],
      },
    });
    this.send(message);
    const roomMessage = JSON.stringify({
      type: "user-joined",
      payload: {
        userId: this.userId,
        x: this.x,
        y: this.y,
      },
    });
    RoomManager.getInstance().braodcastToRoom(spaceId, roomMessage, this);
  }

  public broadcastMovement(payload: movementPayload) {
    const moveX = payload.x;
    const moveY = payload.y;

    (this.x = moveX), (this.y = moveY);
    const xDisplacement = this.x - moveX;
    const yDisplacement = this.y - moveY;

    if (
      (xDisplacement == 0 && yDisplacement == 1) ||
      (xDisplacement == 1 && yDisplacement == 0)
    ) {
      const message = JSON.stringify({
        type: "movement",
        payload: {
          x: this.x,
          y: this.y,
        },
      });
      RoomManager.getInstance().braodcastToRoom(this.spaceId, message, this);
      return;
    }
    this.send(
      JSON.stringify({
        type: "movement-rejected",
        payload: {
          x: this.x,
          y: this.y,
        },
      })
    );
  }
  public leaveRoom() {
    RoomManager.getInstance().braodcastToRoom(
      this.spaceId,
      JSON.stringify({
        type: "user-left",
        payload: {
          userId: this.userId,
        },
      }),
      this
    );
    RoomManager.getInstance().removeUser(this.spaceId, this);
  }
  public send(message: any) {
    this.ws.send(message);
    return;
  }
}
