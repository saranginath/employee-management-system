import { v4 as uuid } from "uuid";
export const generateToken = () => {
  return uuid();
};
