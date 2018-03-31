// @flow
export type ItemIdType = string;
export type ItemNameType = string;
export type ItemType = {
  id: ItemIdType,
  name: ItemNameType,
  isProtected?: boolean
};
