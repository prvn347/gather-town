import prisma from "../prismaClient";

export class avatarServices {
  async getAllAvatars() {
    try {
      const avatars = await prisma.avatar.findMany();

      return avatars;
    } catch (error) {
      throw new Error("error while getting all avatars");
    }
  }
  async getAvatars(avatarIds: Array<string>) {
    try {
      console.log(avatarIds + typeof avatarIds);
      const avatars = await prisma.avatar.findMany({
        where: {
          id: {
            in: avatarIds,
          },
        },
      });
      if (!avatars) {
        return "avatar doesn't exist";
      }

      return avatars;
    } catch (error) {
      console.error(error);
      throw new Error("error while getting user avatars");
    }
  }
}
