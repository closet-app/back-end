import { MikroORM } from "@mikro-orm/core";
import { __password__, __prod__ } from "./constants";
import { Review } from "./entities/Reviews";
import path from "path";

export default {
  password: __password__,
  migrations: {
    path: path.join(__dirname, "./migrations"),
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
  entities: [Review],
  dbName: "closet",
  type: "postgresql",
  debug: !__prod__,
} as Parameters<typeof MikroORM.init>[0];