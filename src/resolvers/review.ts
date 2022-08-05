import { Ctx, Query, Resolver } from "type-graphql";
import { Review } from "../entities/Review";
import { MyContext } from "../types";

@Resolver()
export class ReviewResolver {
  @Query(() => [Review])
  posts(@Ctx() { em }: MyContext): Promise<Review[]> {
    return em.find(Review, {});
  }
}
