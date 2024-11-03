import { map } from "zod";
import prisma from "../prismaClient";
import { avatarType, elementDataType, mapType } from "@repo/types/src/admin";

export class adminServices {
  async addElement(elementMeta: elementDataType) {
    try {
      const element = await prisma.element.create({
        data: {
          imageUrl: elementMeta.imageUrl,
          height: elementMeta.height,
          width: elementMeta.width,
          name: elementMeta.name,
        },
      });
      return element.id;
    } catch (error) {
      console.error(error);
      throw new Error("error while adding data");
    }
  }
  async updateElement(elementId: string, imageUrl: string) {
    try {
      const element = await prisma.element.update({
        where: {
          id: elementId,
        },
        data: {
          imageUrl: imageUrl,
        },
      });
      return element;
    } catch (error) {
      console.error(error);
      throw new Error("error while adding data");
    }
  }

  async addAvatar(avatarMeta: avatarType) {
    try {
      const avatar = await prisma.avatar.create({
        data: {
          name: avatarMeta.name,
          imageUrl: avatarMeta.imageUrl,
        },
      });
      return avatar;
    } catch (error) {
      console.error(error);
      throw new Error("error while adding data");
    }
  }
  async createMap(mapData: mapType) {
    try {
      const elementIds = mapData.defaultElements.map((item) => item.elementId);

      const map = await prisma.map.create({
        data: {
          width: mapData.width,
          height: mapData.height,
          backgroundImagePath: mapData.backgroudImagePath,
          name: mapData.name,
        },
      });
      if (map) {
        await prisma.mapElements.createMany({
          data: mapData.defaultElements.map((item) => ({
            elementId: item.elementId,
            x: item.x,
            y: item.y,
            mapId: map.id,
          })),
        });
      }
      return map.id;
    } catch (error) {
      console.error(error);
      throw new Error("error while creating map");
    }
  }
}
