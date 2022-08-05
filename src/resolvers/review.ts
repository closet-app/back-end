import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Review } from "../entities/Review";
import { MyContext } from "../types";

@Resolver()
export class ReviewResolver {
  @Query(() => [Review])
  reviews(@Ctx() { em }: MyContext): Promise<Review[]> {
    return em.find(Review, {});
  }

  @Query(() => Review, { nullable: true })
  review(
    @Arg("id") id: number,
    @Ctx() { em }: MyContext
  ): Promise<Review | null> {
    return em.findOne(Review, { id });
  }

  @Mutation(() => Review)
  async createReview(
    @Arg("title") title: string,
    @Ctx() { em }: MyContext
  ): Promise<Review> {
    const review = em.create(Review, {
      title,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await em.persistAndFlush(review);
    return review;
  }

  @Mutation(() => Review, { nullable: true })
  async updateReview(
    @Arg("id") id: number,
    @Arg("title", () => String, { nullable: true }) title: string,
    @Ctx() { em }: MyContext
  ): Promise<Review | null> {
    const review = await em.findOne(Review, { id });
    if (!review) {
      return null;
    }
    if (typeof title !== "undefined") {
      review.title = title;
      await em.persistAndFlush(review);
    }

    return review;
  }

  @Mutation(() => Boolean)
  async deleteReview(
    @Arg("id") id: number,
    @Ctx() { em }: MyContext
  ): Promise<boolean> {
    await em.nativeDelete(Review, { id });
    return true;
  }
}
