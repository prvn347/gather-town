import prisma from "../prismaClient";
import bcrypt from "bcryptjs";
import { userMeta } from "@repo/types/src/user";
import { generateToken } from "../utils/jwtUtils";

//TODO:make singleton of prisma

export class userServices {
  async createUser(userMeta: userMeta) {
    try {
      const hashedPassword = await bcrypt.hashSync(userMeta.password, 10);
      const user = await prisma.user.create({
        data: {
          name: userMeta.name,
          password: hashedPassword,
          email: userMeta.email,
          role: "User",
        },
      });

      const token = generateToken(user.id);

      return { user, token };
    } catch (error) {
      return new Error("error while db user creation");
    }
  }
  async findUser(userMeta: userMeta) {
    try {
      const user = await prisma.user.findFirst({
        where: {
          email: userMeta.email,
        },
      });
      if (!user) {
        throw new Error("User not found");
      }
      const isValidPassword = await bcrypt.compare(
        userMeta.password,
        user?.password || ""
      );
      if (!isValidPassword) {
        throw new Error("wrong password");
      }
      if (isValidPassword) {
        const token = generateToken(user.id);
        return { user, token };
      }
    } catch (error) {
      throw new Error("error while finding user");
    }
  }

  async selectAvatar(avatarId: string, userId: string) {
    try {
      const avatar = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          avatarId: avatarId,
        },
      });
      return avatar;
    } catch (error) {
      throw new Error("error while updating avatar");
    }
  }
}
