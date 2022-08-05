import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Review {
  @Field()
  @PrimaryKey()
  id!: number;

  @Field()
  @Property({ type: "date" })
  createdAt: Date = new Date();

  @Field()
  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAtd: Date = new Date();

  @Field()
  @Property({ type: "text" })
  title!: string;
}
