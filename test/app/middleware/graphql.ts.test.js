'use strict';

// const assert = require('assert');
const mm = require('egg-mock');

describe('test/app/middleware.ts.test.js', () => {
  let app;

  before(() => {
    app = mm.app({
      baseDir: 'apps/graphql-ts-app',
    });
    return app.ready();
  });

  after(mm.restore);

  it('should return token List', async () => {
    const resp = await app.httpRequest()
      .post('/graphql')
      .send({
        query: '{getTokenList{message,data{id,token}}}',
      })
      .expect(200);
    console.log(resp.body);
    // assert.deepEqual(resp.body.data, {
    //   data: {
    //     getTokenList: {
    //       success: true,
    //       data: [
    //         {
    //           id: '1',
    //           token: 'token',
    //         },
    //         {
    //           id: '2',
    //           token: 'token',
    //         },
    //       ],
    //     },
    //   },
    // });
  });

});

