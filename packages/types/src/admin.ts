export type elementDataType = {
  name: string;
  imageUrl: string;
  width: number;
  height: number;
};

export type avatarType = {
  imageUrl: string;
  name: string;
};

export type mapType = {
  width: number;
  height: number;
  backgroudImagePath: string;
  name: string;
  defaultElements: Array<defaultElements>;
};
interface defaultElements {
  elementId: string;
  x: number;
  y: number;
}
