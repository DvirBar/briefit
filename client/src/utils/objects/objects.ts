import { GenObj } from "./types";

export const isEmptyObject = (obj: GenObj): boolean => Object.keys(obj).length === 0;
