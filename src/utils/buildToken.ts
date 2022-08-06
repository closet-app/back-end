import jwt from "jsonwebtoken";
import { __tokenSecret__ } from "../constants";
export default (username: string): string => {
  const payload = { username };

  const options = {
    expiresIn: "10h",
  };

  return jwt.sign(payload, __tokenSecret__, options);
};
