import { useState } from "react";

export const useFetching = (callback: (...props: any) => any): any => {
  const [isLoading, setIsLoading] = useState(false);

  const fetching = async (data: any) => {
    try {
      setIsLoading(true);
      await callback(data);
    } finally {
      setIsLoading(false);
    }
  };

  return [fetching, isLoading];
};
