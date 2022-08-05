import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Review } from "./entities/Reviews";
import microConfig from "./mikro-orm.config";

console.log("-------------------testing-------------");

const main = async () => {
  const orm = await MikroORM.init(microConfig);
  await orm.getMigrator().up();

  const review = orm.em.create(Review, {
    title: "my first review",
  });
  await orm.em.persistAndFlush(review);

  const reviews = await orm.em.find(Review, {});
  console.log(reviews);
};

main().catch((err) => {
  console.log(err.message);
});
