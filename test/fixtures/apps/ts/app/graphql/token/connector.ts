import { IMutationCommonRes, IGetTokenByIdRes, IGetTokenListRes } from '../../interface'
export default class TokenConnector {
  async createToken(): Promise<IMutationCommonRes> {
    return {
      success: true,
      message: 'ok',
    };
  }

  async updateToken(): Promise<IMutationCommonRes> {
    return {
      success: true,
      message: 'ok',
    };
  }

  async deleteToken(): Promise<IMutationCommonRes> {
    return {
      success: true,
      message: 'ok',
    };
  }

  async getTokenById(): Promise<IGetTokenByIdRes> {
    return {
      success: true,
      message: 'get service data',
      data: { id: '1', token: 'token' },
    };
  }

  async getTokenList(): Promise<IGetTokenListRes> {
    return {
      success: true,
      message: 'ok',
      data: [
        { id: '1', token: 'token' },
        { id: '2', token: 'token' },
      ],
    };
  }
}

