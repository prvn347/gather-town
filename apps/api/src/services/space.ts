import prisma from "../prismaClient";
import { spaceMeta, speceElementMeta } from "@repo/types/src/space";

export class spaceServices {
  async createSpace(spaceMeta: spaceMeta) {
    try {
      const space = await prisma.space.create({
        data: {
          name: spaceMeta.name,
          backgroundImagePath: spaceMeta.backgroundImagePath,
          width: spaceMeta.width,
          height: spaceMeta.height,
        },
      });
      return space;
    } catch (error) {
      throw new Error("error while creating space");
    }
  }
  async deleteSpace(spaceId: string) {
    try {
      const result = await prisma.space.delete({
        where: {
          id: spaceId,
        },
      });
      return { msg: "deleted" };
    } catch (error) {
      throw new Error("error while deleting space");
    }
  }
  async getAllSpaces() {
    try {
      const spaces = await prisma.space.findMany();
      return spaces;
    } catch (error) {
      throw new Error("error while getting all cards");
    }
  }
  async getSpaceById(spaceId: string) {
    try {
      const space = await prisma.space.findFirst({
        where: {
          id: spaceId,
        },
        select: {
          width: true,
          height: true,
          SpaceElement: true,
        },
      });

      return space;
    } catch (error) {
      console.error(error);
      throw new Error("error while fetch space data");
    }
  }
  async createSpaceElement(spaceMeta: speceElementMeta) {
    try {
      const spaceElement = await prisma.spaceElement.create({
        data: {
          elementId: spaceMeta.elementId,
          spaceId: spaceMeta.spaceId,
          x: spaceMeta.width,
          y: spaceMeta.height,
        },
      });
      return spaceElement;
    } catch (error) {
      console.error(error);
      throw new Error("error while creating space element");
    }
  }
  async deleteSpaceElement(elementMeta: { elementId: string }) {
    try {
      await prisma.spaceElement.delete({
        where: {
          id: elementMeta.elementId,
        },
      });

      return "delelted";
    } catch (error) {
      console.error(error);
      throw new Error("error while deleting the element");
    }
  }
  async getAllElements() {
    try {
      const elements = await prisma.element.findMany();
      return elements;
    } catch (error) {
      throw new Error("error while getting data");
    }
  }
}
