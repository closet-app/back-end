import { User } from "../entities/User";
import { MyContext } from "src/types";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import argon2 from "argon2";
import buildToken from "../utils/buildToken";
import jwt from "jsonwebtoken";
import { __tokenSecret__ } from "../constants";

// used for arguments
@InputType()
class UserInput {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field()
  password: string;
}

@ObjectType()
class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

// can return from mutations
@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User & { token?: string };

  @Field(() => String, { nullable: true })
  token?: string;
}

@Resolver()
export class UserResolver {
  @Query(() => User || null)
  async me(@Arg("token") token: string, @Ctx() { em }: MyContext) {
    return jwt.verify(token, __tokenSecret__, async (err, decoded: any) => {
      if (err) {
        return null;
      } else {
        const user = await em.findOne(User, decoded.email);
        return user;
      }
    });
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("options") options: UserInput,
    @Ctx() { em }: MyContext
  ): Promise<UserResponse> {
    if (options.firstName.length <= 1 || options.firstName.length <= 1) {
      return {
        errors: [
          {
            field: "name",
            message: "length must be greater than 2",
          },
        ],
      };
    }

    if (options.password.length <= 2) {
      return {
        errors: [
          {
            field: "password",
            message: "length must be greater than 2",
          },
        ],
      };
    }

    const hashedPassword = await argon2.hash(options.password);
    const user = em.create(User, {
      firstName: options.firstName,
      lastName: options.lastName,
      email: options.email,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    try {
      await em.persistAndFlush(user);
    } catch (err) {
      // || err.detail.includes('already exists')
      // duplicate email error
      if (err.code === "23505") {
        return {
          errors: [
            {
              field: "email",
              message: "email already in use",
            },
          ],
        };
      }
    }

    return {
      user,
      token: buildToken(options.email),
    };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("options") options: UserInput,
    @Ctx() { em }: MyContext
  ): Promise<UserResponse> {
    const user = await em.findOne(User, { email: options.email });
    if (!user) {
      return {
        errors: [{ field: "email", message: "that email doesn't exist" }],
      };
    }

    const valid = await argon2.verify(user.password, options.password);
    if (!valid) {
      return {
        errors: [{ field: "password", message: "incorrect password" }],
      };
    }

    return {
      user,
      token: buildToken(options.email),
    };
  }
}
