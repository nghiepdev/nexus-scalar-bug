import path from 'path';
import express from 'express';
import {ApolloServer} from 'apollo-server-express';
import {makeSchema} from '@nexus/schema';

import * as allScalars from './scalar';
import * as allTypes from './schema';

const app = express();
const __PORT__ = 3000;

export const schema = makeSchema({
  types: [allScalars, allTypes],
  outputs: {
    schema: path.join(__dirname, './generated/schema.graphql'),
    typegen: path.join(__dirname, './generated/nexus.ts'),
  },
});

const server = new ApolloServer({
  schema,
});

server.applyMiddleware({app, path: '/'});

app.listen({port: __PORT__}, () =>
  console.log(
    `⚡⚡⚡ Server ready at http://localhost:${__PORT__}${server.graphqlPath}`,
  ),
);
