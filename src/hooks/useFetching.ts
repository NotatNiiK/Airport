import { useState } from "react";

type IAnyAsyncFunction = (...args: any[]) => Promise<any>;

export const useFetching = (
  callback: IAnyAsyncFunction
): [IAnyAsyncFunction, boolean] => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetching = async (...data: any[]): Promise<any> => {
    try {
      setIsLoading(true);
      await callback(...data);
    } finally {
      setIsLoading(false);
    }
  };

  return [fetching, isLoading];
};
