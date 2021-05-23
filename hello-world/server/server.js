// used to parse the graphQL schema
const { ApolloServer, gql } = require("apollo-server");


// defining the simple graphQL schema
// client can query servers and ask for greeting
// schema is like an interface specify only queryName and Type.
const typeDefs = gql`
    # schema is default to query. So, from client when query the server we will use the query
    schema {
        query: Query
    }

    type Query {
        greeting: String
    }
`;


// reslover are the implementers for the interface defined (Schema definations)
// graphQL engine will call reslover everytime when client query's server
const resolvers = {
    Query: {
        greeting: () => `Welcome to GraphQL world!!`
    }
};


// to start the server its simple with apollo-server
const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: 9000 }).then((serverInfo) => {
    console.log(`Server is up and running at ${serverInfo.url}`);
}).catch((err) => {
    console.log("Error while setting up the server: " + err);
});


