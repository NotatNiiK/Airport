import { AxiosResponse } from "axios";
import { ISuccess } from "./success";

export type IReqCallback<T> = (data: T) => Promise<AxiosResponse<ISuccess>>;
