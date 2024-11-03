import { userServices } from "../services/user";
import { userMeta } from "@repo/types/src/user";
import { userInputParserVarifier } from "../utils/userInputParser";

export class userControllers {
  userInputParserVarifier = new userInputParserVarifier();

  userService = new userServices();

  async createUser(userData: userMeta) {
    try {
      userInputParserVarifier.validateUserSignupInput(userData);
      return await this.userService.createUser(userData);
    } catch (error) {
      return new Error("error while creating user.");
    }
  }

  async findUser(userData: userMeta) {
    try {
      userInputParserVarifier.validateUserSigninInput(userData);
      return await this.userService.findUser(userData);
    } catch (error) {
      return new Error("error while creating user.");
    }
  }
  async selectAvatar(userId: string, avatarId: string) {
    try {
      return await this.userService.selectAvatar(avatarId, userId);
    } catch (error) {
      return new Error("error while updating user's avatar.");
    }
  }
}
