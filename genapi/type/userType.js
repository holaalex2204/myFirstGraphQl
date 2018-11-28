const { GraphQLObjectType, GraphQLString,} = require('graphql');
const userType = new GraphQLObjectType(
  {
    name:'userType',
    fields: {
      username:{
        type: GraphQLString,
      },
      lastName:{
        type: GraphQLString,
      }
    }
  }
);

module.exports = userType;