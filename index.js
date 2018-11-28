'use strict';

const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, } = require('graphql');
const express = require('express');
const graphQLHTTP = require('express-graphql');
const PORT = 3000;
const eversince = require('gen-eversince-client');


const eventType = require('./eversince/type/eventType');

eversince.setUrl('https://543i3cqo3a.execute-api.us-east-1.amazonaws.com/staging');
eversince.setAuthKey('7WGzn4Xm4N8J6r5uSi8kL7oY0taWPmhnavn7zfaW');
const server = express();

const queryType = new GraphQLObjectType(
  {
    name: 'QueryType',
    fields: {
      recentEvents: {
        type: new GraphQLList(eventType),
        resolve: async () => {
          let result = (await eversince.getEvents({}));
          return result.data;
        }
      }
    }
  }
);
const schema =  new GraphQLSchema({
  query: queryType,
})

server.use('/graphQL',graphQLHTTP({
  schema,
  graphiql: true,
}))
server.listen(PORT,() => {
  console.log('Listening on port 3000')
})