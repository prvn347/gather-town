import { spaceServices } from "../services/space";
import { spaceMeta, speceElementMeta } from "@repo/types/src/space";

export class spaceControllers {
  spaceService = new spaceServices();
  async createSpace(spaceMeta: spaceMeta) {
    try {
      return await this.spaceService.createSpace(spaceMeta);
    } catch (error) {
      throw new Error("error while craeting space");
    }
  }
  async deleteSpace(spaceId: string) {
    try {
      return await this.spaceService.deleteSpace(spaceId);
    } catch (error) {
      return new Error("error while deleting space");
    }
  }
  async getAllSpaces() {
    try {
      return await this.spaceService.getAllSpaces();
    } catch (error) {
      return new Error("error while getting spaces");
    }
  }
  async getAllElements() {
    try {
      return await this.spaceService.getAllElements();
    } catch (error) {
      return new Error("unable to get data from service");
    }
  }
  async createSpaceElement(spaceMeta: speceElementMeta) {
    try {
      return await this.spaceService.createSpaceElement(spaceMeta);
    } catch (error) {
      return new Error("unable to get data from service");
    }
  }
  async deleteElement(elementMeta: { elementId: string }) {
    try {
      return await this.spaceService.deleteSpaceElement(elementMeta);
    } catch (error) {}
  }
  async getSpaceById(spaceId: string) {
    try {
      return await this.spaceService.getSpaceById(spaceId);
    } catch (error) {
      return new Error("unable to get space from service");
    }
  }
}
