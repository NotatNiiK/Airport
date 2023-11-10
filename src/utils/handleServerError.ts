import { IServerResponse, IServerError } from "../models/server.response";

function handleServerError(e: unknown): IServerResponse {
  const error = e as IServerError;
  console.log(error);

  return {
    hasError: true,
    response: error.response?.data?.message || "Unexpected error",
  };
}

export default handleServerError;
