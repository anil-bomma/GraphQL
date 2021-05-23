// used to parse the graphQL schema
const { gql } = require("apollo-server");


// defining the simple graphQL schema
// client can query greeting to the server
const typeDef = gql`
    type Query {
        greeting: String
    }
`;

