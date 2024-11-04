export type elementDataType = {
  imageUrl: string;
  width: number;
  height: number;
  static: boolean;
};

export type avatarType = {
  imageUrl: string;
  name: string;
};

export type mapType = {
  thumbnail: string;
  dimensions: string;
  name: string;
  defaultElements: Array<defaultElements>;
};
interface defaultElements {
  elementId: string;
  x: number;
  y: number;
}
