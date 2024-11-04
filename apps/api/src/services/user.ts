import prisma from "../prismaClient";
import bcrypt from "bcryptjs";
import { signinUserMeta, userMeta } from "@repo/types/dist/user";
import { generateToken } from "../utils/jwtUtils";
import e from "express";

//TODO:make singleton of prisma

export class userServices {
  async createUser(userMeta: userMeta) {
    try {
      const hashedPassword = await bcrypt.hashSync(userMeta.password, 10);
      const user = await prisma.user.create({
        data: {
          password: hashedPassword,
          username: userMeta.username,
          role: userMeta.type === "admin" ? "Admin" : "User",
        },
      });
      const userId = user.id;
      const role = user.role;
      const token = generateToken({ userId, role });

      return { user, token };
    } catch (error) {
      return new Error("error while db user creation");
    }
  }
  async findUser(userMeta: signinUserMeta) {
    try {
      const user = await prisma.user.findFirst({
        where: {
          username: userMeta.username,
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
      const userId = user.id;
      const role = user.role;
      if (isValidPassword) {
        const token = generateToken({ userId, role });
        return { user, token };
      }
    } catch (error) {
      throw new Error("error while finding user");
    }
  }

  async selectAvatar(avatarMeta: { avatarId: string }, userId: string) {
    try {
      const avatarExists = await prisma.avatar.findUnique({
        where: { id: avatarMeta.avatarId },
      });

      if (!avatarExists) {
        throw new Error("Invalid avatar ID");
      }

      const avatar = await prisma.user.update({
        where: { id: userId },
        data: { avatarId: avatarMeta.avatarId },
      });

      return avatar;
    } catch (error) {
      console.error(error);
      throw new Error("Error while updating avatar");
    }
  }
}
