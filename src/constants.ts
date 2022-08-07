require("dotenv").config();
export const __prod__ = process.env.NODE_ENV === "production";
export const __password__ = process.env.PASSWORD || "password";
export const __tokenSecret__ = process.env.TOKEN_SECRET || "is a secret to all";
