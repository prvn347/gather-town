import prisma from "../prismaClient";
import { adminServices } from "../services/admin";
import { avatarType, elementDataType, mapType } from "@repo/types/src/admin";

export class adminControllers {
  private adminService;
  constructor() {
    this.adminService = new adminServices();
  }
  async addElement(elementMeta: elementDataType) {
    try {
      return await this.adminService.addElement(elementMeta);
    } catch (error) {
      return new Error("unable to get data from admin service");
    }
  }
  async updateElement(elementId: string, imageUrl: string) {
    try {
      return await this.adminService.updateElement(elementId, imageUrl);
    } catch (error) {
      return new Error("unable to get dta from service ");
    }
  }
  async addAvatar(avatarMeta: avatarType) {
    try {
      return await this.adminService.addAvatar(avatarMeta);
    } catch (error) {
      return new Error("unable to get dta from service");
    }
  }
  async createMap(mapData: mapType) {
    try {
      return await this.adminService.createMap(mapData);
    } catch (error) {
      return new Error("unable to create map data in service");
    }
  }
}
