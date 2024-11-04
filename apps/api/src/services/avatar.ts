import prisma from "../prismaClient";

export class avatarServices {
  async getAllAvatars() {
    try {
      const metadata = await prisma.avatar.findMany();

      // metadata.map((m) => ({
      //   userId: m.id,
      //   avatarId: m.avatar?.imageUrl,
      // }));

      return metadata;
    } catch (error) {
      throw new Error("error while getting all avatars");
    }
  }
  async getAvatars(userIds: Array<string>) {
    try {
      console.log(userIds);
      const metadata = await prisma.user.findMany({
        where: {
          id: {
            in: userIds,
          },
        },
        select: {
          avatar: true,
          id: true,
        },
      });
      const avatars = metadata.map((m) => ({
        userId: m.id,
        avatarId: m.avatar?.imageUrl,
      }));

      console.log(avatars.length);
      return metadata.map((m) => ({
        userId: m.id,
        avatarId: m.avatar?.imageUrl,
      }));
    } catch (error) {
      console.error(error);
      throw new Error("error while getting user avatars");
    }
  }
}
