import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
// import { Review } from "./entities/Reviews";
import microConfig from "./mikro-orm.config";
import express from "express";

const main = async () => {
  const orm = await MikroORM.init(microConfig);
  await orm.getMigrator().up();
  // const fork = orm.em.fork();

  const app = express();
  app.get("/", (_, res) => {
    res.json({ message: "hello world" });
  });
  app.listen(4000, () => {
    console.log("server started on localhost:4000");
  });
};

main().catch((err) => {
  console.log(err.message);
});
