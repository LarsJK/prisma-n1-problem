const { ApolloServer, gql } = require("apollo-server");
const { Prisma } = require("./generated/prisma-client");

const prisma = new Prisma({ debug: true });

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    messages: [Message!]!
  }

  type Message {
    id: ID!
    body: String
    author: User!
  }

  type Query {
    users: [User!]!
    messages: [Message!]!
  }
`;

const resolvers = {
  Query: {
    users: () => prisma.users(),
    messages: () => prisma.messages()
  },
  Message: {
    author: ({ id }) => prisma.message({ id }).author()
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
