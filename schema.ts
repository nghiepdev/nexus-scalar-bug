import * as schema from '@nexus/schema';

export const CreatedAt = schema.interfaceType({
  name: 'CreatedAt',
  definition(t) {
    // Does'nt works
    t.datetime('createdAt', {
      resolve(field) {
        return new Date(field.created_at) as any;
      },
    });
    t.resolveType(() => null);
  },
});

export const User = schema.objectType({
  name: 'User',
  definition(t) {
    t.implements('CreatedAt');
    t.id('id');
    t.datetime('last_login_at'); // It Works
  },
});
