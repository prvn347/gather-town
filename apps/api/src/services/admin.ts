import { map } from "zod";
import prisma from "../prismaClient";
import { avatarType, elementDataType, mapType } from "@repo/types/dist/admin";

export class adminServices {
  async addElement(elementMeta: elementDataType) {
    try {
      const element = await prisma.element.create({
        data: {
          imageUrl: elementMeta.imageUrl,
          height: elementMeta.height,
          width: elementMeta.width,
          static: elementMeta.static,
        },
      });
      return element.id;
    } catch (error) {
      console.error(error);
      throw new Error("error while adding data");
    }
  }
  async updateElement(elementId: string, imageMeta: { imageUrl: string }) {
    try {
      const element = await prisma.element.update({
        where: {
          id: elementId,
        },
        data: {
          imageUrl: imageMeta.imageUrl,
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
      return avatar.id;
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
          thumbnail: mapData.thumbnail,
          height: parseInt(mapData.dimensions.split("x")[1] || ""),
          width: parseInt(mapData.dimensions.split("x")[0] || ""),
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
