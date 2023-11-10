interface IServerResponse {
  hasError: boolean;
  response: string;
}

interface IServerError {
  response: {
    data: {
      message: string;
    };
  };
}

export type { IServerResponse, IServerError };
