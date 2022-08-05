import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class Review {
  @PrimaryKey()
  _id!: number;

  @Property({ type: "date" })
  createdAt = new Date();

  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAtd = new Date();

  @Property({ type: "text" })
  name!: string;
}
