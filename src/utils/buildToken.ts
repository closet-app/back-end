import jwt from "jsonwebtoken";
import { __tokenSecret__ } from "../constants";
export default (email: string): string => {
  const payload = { email };

  const options = {
    expiresIn: "10h",
  };

  return jwt.sign(payload, __tokenSecret__, options);
};
