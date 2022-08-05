import { Ctx, Query, Resolver } from "type-graphql";
import { MyContext } from "src/types";
import { Review } from "src/entities/Review";

@Resolver()
export class ReviewResolver {
  @Query(() => [Review])
  posts(@Ctx() { em }: MyContext): Promise<Review[]> {
    return em.find(Review, {});
  }
}
