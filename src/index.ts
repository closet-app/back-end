import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
// import { Review } from "./entities/Reviews";
import microConfig from "./mikro-orm.config";

const main = async () => {
  const orm = await MikroORM.init(microConfig);
  await orm.getMigrator().up();
  // const fork = orm.em.fork();

  // const review = fork.create(Review, { title: "my first review 323" });
  // await fork.persistAndFlush(review);

  // const reviews = await fork.find(Review, {});
  // console.log(reviews);
};

main().catch((err) => {
  console.log(err.message);
});
