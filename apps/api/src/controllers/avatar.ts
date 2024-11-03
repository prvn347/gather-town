import { avatarServices } from "../services/avatar";

export class avatarControllers {
  private avatarService;

  constructor() {
    this.avatarService = new avatarServices();
  }

  async getAllAvatars() {
    try {
      return await this.avatarService.getAllAvatars();
    } catch (error) {
      return new Error("error while getting all avatars");
    }
  }
  async getAvatars(avatarIds: Array<string>) {
    try {
      return await this.avatarService.getAvatars(avatarIds);
    } catch (error) {
      return new Error("error while getting avatars");
    }
  }
}
