import { joinPayload } from "@repo/types/dist/ws";
import { User } from "./user";

export class RoomManager {
  rooms: Map<string, User[]> = new Map();
  private static instance: RoomManager;
  constructor() {
    this.rooms = new Map();
  }
  static getInstance() {
    if (!this.instance) {
      this.instance = new RoomManager();
    }
    return this.instance;
  }

  public addUser(spaceId: string, user: User) {
    if (!this.rooms.get(spaceId)) {
      this.rooms.set(spaceId, [user]);
      return;
    }
    this.rooms.set(spaceId, [...(this.rooms.get(spaceId) ?? []), user]);
  }
  public removeUser(spaceId: string, user: User) {
    if (!this.rooms.has(spaceId)) {
      return;
    }
    this.rooms.set(
      spaceId,
      this.rooms.get(spaceId)?.filter((u) => u.id !== user.id) ?? []
    );
  }
  public braodcastToRoom(roomId: string, message: any, user: User) {
    if (!this.rooms.get(roomId)) {
      return;
    }
    this.rooms.get(roomId)?.forEach((u) => {
      if (u.id !== user.id) {
        u.send(message);
      }
    });
  }
}
