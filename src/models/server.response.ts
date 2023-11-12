export interface IServerResponse {
  hasError: boolean;
  response: string;
}

export interface IServerError {
  response: {
    data: {
      message: string;
    };
  };
}
