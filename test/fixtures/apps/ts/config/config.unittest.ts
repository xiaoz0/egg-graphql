
import { Context } from 'egg';

exports.keys = 'plugin-graphql';
exports.middleware = [ 'graphql' ];
exports.security = {
  csrf: false,
};

exports.graphql = {
  router: '/graphql',
  graphiql: true,
  // graphQL 路由前的拦截器
  onPreGraphQL: async (ctx: Context) : Promise<void> => {},
  // 开发工具 graphiQL 路由前的拦截器，建议用于做权限操作(如只提供开发者使用)
  onPreGraphiQL: async (ctx: Context): Promise<void> => {},
};
