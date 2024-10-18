declare module 'tonapi-sdk-js' {
  export class HttpClient {
    constructor(options: {
      baseUrl: string
      baseApiParams: {
        headers: {
          'Content-type': string
        }
      }
    })
  }

  export class Api<T> {
    [x: string]: any
    constructor(httpClient: HttpClient)
  }
}
