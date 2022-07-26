const { gql } = require('apollo-server');

exports.typeDefs = gql`
  type Query {
    hello: String
    profile(id: String!): User
  }

  type User {
    id: ID!
    username: String!
    location: String
    height: Int
    weight: Int
    bottomSize: Int
    topSize: Int
    showSize: Int
    reviews: [Review!]
    closet: [Cloth!]
  }

  type Review {
    id: ID!
    review: String!
    rating: String!
  }

  type Cloth {
    id: ID!
    size: Int!
    color: Int!
    season: String
  }
`;
