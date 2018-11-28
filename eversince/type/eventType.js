const { GraphQLObjectType, GraphQLString, GraphQLInt, } = require('graphql');
const axios = require('axios');
const userType = require('../../genapi/type/userType');
const eventType = new GraphQLObjectType(
  {
    name:'eventType',
    fields: {
      name:{
        type: GraphQLString,
      },
      actor_id: {
        type: GraphQLInt,
      },
      user: {
        type: userType,
        resolve: async (obj) => {
          try {
            let result = await axios.get('https://genapi.generation.org/user?params={"id":"' + obj.actor_id + '"}&options={"attributes":["username","lastName"]}', {
                headers: {
                  cookie: '_ga=GA1.2.973306759.1529811082; _gcl_au=1.1.1186256985.1539806612; connect.sid=s%3A3D8vwI73mOJYL2yT2MyPiPmCAZd0aQAx.mTBsPy0mi3VHKmsMZvc1XkFRFzYQ%2FA2M3ZJAHgUyQLA'
                }
              }
            )
            return result.data.data[0];
          }
          catch(error) {
            console.log(error);
          }
          return null;
        }
      }
    }
  }
);
module.exports = eventType;