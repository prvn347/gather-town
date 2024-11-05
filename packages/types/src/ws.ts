export type joinMessageTyep = {
  type: string;
  payload: joinPayload;
};

export type joinPayload = {
  spaceId: string;
  token: string;
};
export type movementType = {
  type: string;
  payload: movementPayload;
};

export type movementPayload = {
  x: number;
  y: number;
};
