
export interface IToken {
  id: string
  token: string
}

export interface IGetTokenByIdReq {
  id: string
}

export interface IGetTokenByIdRes {
  success: boolean
  message: string
  data: IToken
}

export interface IGetTokenListRes {
  success: boolean
  message: string
  data: IToken[]
}

export interface IMutationCommonRes {
  success: boolean
  message: string
}

export interface ICreateOrUpdateTokenReq {
  token: string
}

export interface IDeleteTokenReq {
  token: string
}


