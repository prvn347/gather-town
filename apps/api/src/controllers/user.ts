import { userServices } from "../services/user";
import { signinUserMeta, userMeta } from "@repo/types/dist/user";
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

  async findUser(userData: signinUserMeta) {
    try {
      userInputParserVarifier.validateUserSigninInput(userData);
      return await this.userService.findUser(userData);
    } catch (error) {
      return new Error("error while creating user.");
    }
  }
  async selectAvatar(userId: string, avatarMeta: { avatarId: string }) {
    try {
      return await this.userService.selectAvatar(avatarMeta, userId);
    } catch (error) {
      return new Error("error while updating user's avatar.");
    }
  }
}
