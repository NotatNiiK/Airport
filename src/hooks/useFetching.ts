import { useState } from "react";

export const useFetching = (
  callback: (...args: any[]) => Promise<any>
): [(...data: any[]) => Promise<any>, boolean] => {
  const [isLoading, setIsLoading] = useState(false);

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
