import { useState, useMemo } from "react";

export const usePasswordMask = (): [boolean, string, () => void] => {
  const [isPasswordMask, setIsPasswordMask] = useState<boolean>(true);

  const passwordType = useMemo((): string => {
    return isPasswordMask ? "password" : "text";
  }, [isPasswordMask]);

  function togglePasswordMask(): void {
    setIsPasswordMask(!isPasswordMask);
  }

  return [isPasswordMask, passwordType, togglePasswordMask];
};
