import prisma from "../prismaClient";
import { spaceMeta, speceElementMeta } from "@repo/types/src/space";

export class spaceServices {
  async createSpace(spaceMeta: spaceMeta, createrId: string) {
    try {
      if (!spaceMeta.mapId) {
        const space = await prisma.space.create({
          data: {
            name: spaceMeta.name,

            width: parseInt(spaceMeta.dimensions.split("x")[0] || ""),
            height: parseInt(spaceMeta.dimensions.split("x")[1] || ""),
            creatorId: createrId,
          },
        });

        return space.id;
      }

      const map = await prisma.map.findFirst({
        where: {
          id: spaceMeta.mapId,
        },
        select: {
          mapElements: true,
          width: true,
          height: true,
        },
      });
      console.log("after");
      if (!map) {
        throw new Error("map not found");
      }
      let space = await prisma.$transaction(async () => {
        const space = await prisma.space.create({
          data: {
            name: spaceMeta.name,

            width: parseInt(spaceMeta.dimensions.split("x")[0] || ""),
            height: parseInt(spaceMeta.dimensions.split("x")[1] || ""),
            creatorId: createrId,
          },
        });

        await prisma.spaceElements.createMany({
          data: map.mapElements.map((e) => ({
            spaceId: space.id,
            elementId: e.elementId,
            x: e.x!,
            y: e.y!,
          })),
        });

        return space.id;
      });
      return space;
    } catch (error) {
      throw new Error("error while creating space");
    }
  }
  async deleteSpace(spaceId: string, userId: string) {
    try {
      console.log("delete service is with" + spaceId + userId);
      const space = await prisma.space.findUnique({
        where: {
          id: spaceId,
        },
        select: {
          creatorId: true,
        },
      });
      console.log(space);
      if (!space) {
        throw new Error("space does not  exist");
      }

      if (space.creatorId !== userId) {
        console.log("code should reach here");

        return "unautherized";
      }
      const result = await prisma.space.delete({
        where: {
          id: spaceId,
        },
      });

      return { msg: "deleted" };
    } catch (error) {
      console.error(error);
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
      const metaData = await prisma.space.findFirst({
        where: {
          id: spaceId,
        },
        select: {
          width: true,
          height: true,
          elements: true,
        },
      });
      if (!metaData) {
        throw new Error("space does exits");
        return;
      }

      const space = {
        dimensions: metaData?.width + "x" + metaData?.height,
        elements: metaData?.elements,
      };

      return space;
    } catch (error) {
      console.error(error);
      throw new Error("error while fetch space data");
    }
  }
  async createSpaceElement(spaceMeta: speceElementMeta) {
    try {
      const space = (await prisma.space.findFirst({
        where: {
          id: spaceMeta.spaceId,
        },
      })) as {
        id: string;
        name: string;
        width: number;
        height: number;
        thumbnail: string | null;
        creatorId: string;
      };
      if (
        space.width < spaceMeta.x ||
        space.height < spaceMeta.y ||
        spaceMeta.x < 0 ||
        spaceMeta.y < 0
      ) {
        throw new Error("element's dimension is out of bound");
      }
      if (!space) {
        throw new Error("space does exist");
      }
      const spaceElement = await prisma.spaceElements.create({
        data: {
          elementId: spaceMeta.elementId,
          spaceId: spaceMeta.spaceId,
          x: spaceMeta.x,
          y: spaceMeta.y,
        },
      });
      return spaceElement;
    } catch (error) {
      console.error(error);
      throw new Error("error while creating space element");
    }
  }
  async deleteSpaceElement(elementMeta: { id: string }) {
    try {
      await prisma.spaceElements.delete({
        where: {
          id: elementMeta.id,
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
